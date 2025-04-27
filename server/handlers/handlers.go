package handlers

import (
	"database/sql"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type request struct {
	Secret    string `json:"secret"`
	ExpiresIn int    `json:"expires_in"`
}

type response struct {
	Status  string `json:"status"`
	Details string `json:"details,omitempty"`
	Link    string `json:"link,omitempty"`
}
type ServiceHandler struct {
	db *sql.DB
}

func NewServiceHandler(db *sql.DB) *ServiceHandler {
	return &ServiceHandler{db: db}
}

func (s *ServiceHandler) GenerateLink(c *gin.Context) {
	var requestJSON request
	var responseBody response

	c.BindJSON(&requestJSON)

	if requestJSON.Secret == "" {
		responseBody.Status = "Failure"
		responseBody.Details = "Please Provide a valid secret"
		c.JSON(http.StatusBadRequest, responseBody)
		return
	}

	id := uuid.NewString()

	responseBody.Status = "Success"
	responseBody.Link = "/" + id

	c.JSON(http.StatusOK, responseBody)
}

func (s *ServiceHandler) GetSecret(c *gin.Context) {
	secretID := c.Param("id")
	c.JSON(http.StatusFound, gin.H{
		"id":     secretID,
		"secret": "Hi dev , hope its going alright",
	})
}

func (s *ServiceHandler) ShowStatus(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"status": "ok"})
}
