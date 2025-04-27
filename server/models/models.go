package models

import "time"

type Config struct {
	DBUSER     string `env:"DBUSER"`
	DBPASSWORD string `env:"DBPASSWORD"`
	DBNAME     string `env:"DBNAME"`
	SERVERPORT string `env:"SERVERPORT"`
	DBPORT     string `env:"DBPORT"`
	DBHOST     string `env:"DBHOST"`
}

type Secret struct {
	Id        string
	Secret    string
	CreatedAt time.Time
	ExpiresAt time.Time
	One_time  bool
	Viewed    bool
}

// CREATE TABLE secrets (
//     id UUID PRIMARY KEY,
//     secret TEXT NOT NULL,
//     expires_at TIMESTAMPTZ NOT NULL,
//     one_time BOOLEAN DEFAULT FALSE,
//     created_at TIMESTAMPTZ DEFAULT NOW(),
//     viewed BOOLEAN DEFAULT FALSE
// );
