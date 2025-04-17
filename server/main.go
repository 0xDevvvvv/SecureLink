package main

import (
	"github.com/0xDevvvvv/SecureLink/handlers"
	"github.com/gin-gonic/gin"
)

func main() {

	router := gin.Default()
	router.POST("/generate", handlers.GenerateLink)
	router.GET("/s/:id", handlers.GetSecret)

	router.Run(":8080")

}
