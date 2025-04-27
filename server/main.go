package main

import (
	"database/sql"
	"fmt"
	"log"

	"github.com/0xDevvvvv/SecureLink/config"
	"github.com/0xDevvvvv/SecureLink/handlers"
	"github.com/0xDevvvvv/SecureLink/services"
	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
)

func main() {

	//loads the environment variables
	config.LoadConfig()

	//set up db connection string
	psqlInfo := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		config.AppConfig.DBHOST, config.AppConfig.DBPORT, config.AppConfig.DBUSER, config.AppConfig.DBPASSWORD, config.AppConfig.DBNAME)
	db, err := sql.Open("postgres", psqlInfo)

	if err != nil {
		log.Fatal("Error in database connection : ", err)
	}
	defer db.Close()

	//set up the db services interfaces
	dbService := services.NewDBServices(db)
	//setup the handler with the implemented interface
	handlers := handlers.NewServiceHandler(dbService)

	//set up router
	router := gin.Default()

	router.POST("/generate", handlers.GenerateLink)
	router.GET("/s/:id", handlers.GetSecret)
	router.GET("status/:id", handlers.ShowStatus)

	router.Run(":" + config.AppConfig.SERVERPORT)

}
