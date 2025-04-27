package services

import (
	"database/sql"
	"fmt"
	"log"

	"github.com/0xDevvvvv/SecureLink/models"
)

type DBServices struct {
	db *sql.DB
}

func (d *DBServices) createSecret(s models.Secret) error {
	query := `INSERT INTO secrets (id, secret, created_at, expires_at, viewed, one_time) VALUES ($1, $2, $3, $4, $5, $6)`
	_, err := d.db.Exec(query, s.Id, s.Secret, s.CreatedAt, s.ExpiresAt, s.Viewed, s.One_time)
	if err != nil {
		return fmt.Errorf("error while inserting record: %w", err)
	}
	return nil
}

func (d *DBServices) getSecret(id string) (*models.Secret, error) {

	var secret models.Secret

	query := `SELECT id,secret,created_at,expires_at,viewed,one_time FROM secrets WHERE id = $1`
	rows := d.db.QueryRow(query, id)

	if err := rows.Err(); err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("no records found with the given Id : %w", err)
		}
		log.Fatal("Error while retrieving secrets : ", err)
	}

	err := rows.Scan(&secret.Id, &secret.Secret, &secret.CreatedAt, &secret.ExpiresAt, &secret.Viewed, &secret.One_time)
	if err != nil {
		return nil, fmt.Errorf("error while parsing records : %w", err)
	}

	return &secret, nil

}
func (d *DBServices) deleteSecret(id string) error {
	query := `DELETE FROM secrets WHERE id = $1`
	_, err := d.db.Exec(query, id)

	if err != nil {
		return fmt.Errorf("error deleting secret: %w", err)
	}
	return nil
}
