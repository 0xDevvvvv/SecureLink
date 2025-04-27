package config

import (
	"github.com/0xDevvvvv/SecureLink/models"
	"github.com/caarlos0/env/v11"
	"github.com/lpernett/godotenv"
)

var AppConfig models.Config

func LoadConfig() {
	godotenv.Load()
	env.Parse(&AppConfig)
}
