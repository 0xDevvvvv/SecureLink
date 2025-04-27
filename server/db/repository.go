package db

import "github.com/0xDevvvvv/SecureLink/models"

type SecurelinkDB interface {
	GetSecret(id string) (*models.Secret, error)
	CreateSecret(m models.Secret) error
	DeleteSecret(id string) error
	UpdateViewStatus(id string) error
}
