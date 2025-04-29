package models

import "time"

type Config struct {
	DBUSER     string `env:"DBUSER"`
	DBPASSWORD string `env:"DBPASSWORD"`
	DBNAME     string `env:"DBNAME"`
	SERVERPORT string `env:"SERVERPORT"`
	DBPORT     string `env:"DBPORT"`
	DBHOST     string `env:"DBHOST"`
	CLIENTPORT string `env:"CLIENTPORT"`
	AESKEY     string `env:"AESKEY"`
}

type Secret struct {
	Id        string    `json:"id"`
	Secret    string    `json:"secret,omitempty"`
	CreatedAt time.Time `json:"created_at,omitempty"`
	ExpiresAt time.Time `json:"expires_at,omitempty"`
	One_time  bool      `json:"one_time"`
	Viewed    bool      `json:"viewed"`
}

// CREATE TABLE secrets (
//     id UUID PRIMARY KEY,
//     secret TEXT NOT NULL,
//     expires_at TIMESTAMPTZ NOT NULL,
//     one_time BOOLEAN DEFAULT FALSE,
//     created_at TIMESTAMPTZ DEFAULT NOW(),
//     viewed BOOLEAN DEFAULT FALSE
// );
