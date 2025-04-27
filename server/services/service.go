package services

import (
	"database/sql"
	"fmt"
	"log"

	"github.com/0xDevvvvv/SecureLink/models"
)

/*
This service implements the database interface at repository.go
This implementation uses the sql connection

*/

type DBServices struct {
	db *sql.DB
}

// constructor for the DB Services
func NewDBServices(db *sql.DB) *DBServices {
	return &DBServices{db: db}
}

// insert a new secret into the table with uuid as primary key
func (d *DBServices) CreateSecret(s models.Secret) error {
	query := `INSERT INTO secrets (id, secret, created_at, expires_at, viewed, one_time) VALUES ($1, $2, $3, $4, $5, $6)`

	//execute the query and return errors ,if any
	_, err := d.db.Exec(query, s.Id, s.Secret, s.CreatedAt, s.ExpiresAt, s.Viewed, s.One_time)
	if err != nil {
		return fmt.Errorf("error while inserting record: %w", err)
	}
	return nil
}

// this function gets a secret from the database with the id as key
func (d *DBServices) GetSecret(id string) (*models.Secret, error) {

	var secret models.Secret

	query := `SELECT id,secret,created_at,expires_at,viewed,one_time FROM secrets WHERE id = $1`

	//rows is a struct with Error() and Scans as fields
	//it is returned as result of QUeryRow
	rows := d.db.QueryRow(query, id)
	if err := rows.Err(); err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("no records found with the given Id : %w", err)
		}
		log.Fatal("Error while retrieving secrets : ", err)
	}
	//rows.scan scans the fields returned by select statement to destination fields given as argument
	err := rows.Scan(&secret.Id, &secret.Secret, &secret.CreatedAt, &secret.ExpiresAt, &secret.Viewed, &secret.One_time)
	if err != nil {
		return nil, fmt.Errorf("error while parsing records : %w", err)
	}

	return &secret, nil

}

// deletes a secret from the table
func (d *DBServices) DeleteSecret(id string) error {
	query := `DELETE FROM secrets WHERE id = $1`
	_, err := d.db.Exec(query, id)

	if err != nil {
		return fmt.Errorf("error deleting secret: %w", err)
	}
	return nil
}

// update the view status to true if it is not
func (d *DBServices) UpdateViewStatus(id string) error {
	query := `UPDATE secrets SET viewed = TRUE WHERE id = $1`
	_, err := d.db.Exec(query, id)
	if err != nil {
		return fmt.Errorf("error updating view status : %w", err)
	}
	return nil
}
