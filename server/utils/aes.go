package utils

import (
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"encoding/hex"
	"fmt"
	"io"

	"github.com/0xDevvvvv/SecureLink/config"
)

func Encrypt(data string) (string, error) {
	plaintext := []byte(data) // convert to byte type
	key := []byte(config.AppConfig.AESKEY)
	fmt.Println(key)
	//create a new cipher block with key as aes key
	block, err := aes.NewCipher(key)
	if err != nil {
		fmt.Println("error creating aes block cipher", err)
		return "", fmt.Errorf("error creating aes block cipher : %v", err)
	}
	//create a new gcm block with the cipher block
	gcm, err := cipher.NewGCM(block)
	if err != nil {
		fmt.Println("error setting gcm mode", err)
		return "", fmt.Errorf("error setting gcm mode : %v", err)
	}
	nonce := make([]byte, gcm.NonceSize())

	//create a nonce
	if _, err := io.ReadFull(rand.Reader, nonce); err != nil {
		fmt.Println("error generating the nonce ", err)
		return "", fmt.Errorf("error generating the nonce : %v ", err)
	}
	//encrypt the plain text and seal it using the nonce
	ciphertext := gcm.Seal(nonce, nonce, plaintext, nil)
	// encode to hex
	enc := hex.EncodeToString(ciphertext)
	fmt.Println("original data:", data)
	fmt.Println("encrypted data:", enc)
	return enc, nil
}

func Decrypt(enc string) (string, error) {

	key := []byte(config.AppConfig.AESKEY)
	fmt.Println(key)
	//create a new cipher block with key as aes key
	block, err := aes.NewCipher(key)
	if err != nil {
		fmt.Println("error creating aes block cipher", err)
		return "", fmt.Errorf("error creating aes block cipher : %v", err)
	}
	//create a new gcm block with the cipher block
	gcm, err := cipher.NewGCM(block)
	if err != nil {
		fmt.Println("error setting gcm mode", err)
		return "", fmt.Errorf("error setting gcm mode : %v", err)
	}
	decodedCipherText, err := hex.DecodeString(enc)
	if err != nil {
		fmt.Println("error decoding hex", err)
		return "", fmt.Errorf("error decoding hex %v", err)
	}

	decryptedData, err := gcm.Open(nil, decodedCipherText[:gcm.NonceSize()], decodedCipherText[gcm.NonceSize():], nil)
	if err != nil {
		fmt.Println("error decrypting data", err)
		return "", fmt.Errorf("error decrypting data %v", err)
	}

	return string(decryptedData), nil
}
