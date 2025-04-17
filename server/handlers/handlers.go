package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type Secret struct {
	Message   string `json:"secret"`
	ExpiresIn int    `json:"expires_in"`
}

func GenerateLink(c *gin.Context) {
	var requestJSON Secret
	c.BindJSON(&requestJSON)
	c.JSON(200, gin.H{
		"Status":  "Success",
		"details": requestJSON,
	})
}

func GetSecret(c *gin.Context) {
	secretID := c.Param("id")
	c.JSON(http.StatusFound, gin.H{
		"id":     secretID,
		"secret": "Hi dev , hope its going alright",
	})
}
