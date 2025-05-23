package handlers

import (
	"fmt"
	"net/http"
	"time"

	"github.com/0xDevvvvv/SecureLink/db"
	"github.com/0xDevvvvv/SecureLink/models"
	"github.com/0xDevvvvv/SecureLink/utils"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type request struct {
	Secret    string `json:"secret"`
	ExpiresIn int    `json:"expires_in"`
}

type response struct {
	Status  string         `json:"status"`
	Details string         `json:"details,omitempty"`
	Link    string         `json:"link,omitempty"`
	Secret  *models.Secret `json:"secret,omitempty"`
}
type ServiceHandler struct {
	services db.SecurelinkDB
}

func NewServiceHandler(dbInterface db.SecurelinkDB) *ServiceHandler {
	return &ServiceHandler{services: dbInterface}
}

func (s *ServiceHandler) GenerateLink(c *gin.Context) {
	var requestJSON request
	var responseBody response

	c.BindJSON(&requestJSON)

	//if there is no secrets
	if requestJSON.Secret == "" {
		responseBody.Status = "Failure"
		responseBody.Details = "Please Provide a valid secret"
		c.JSON(http.StatusBadRequest, responseBody)
		return
	}

	//create a new uuid
	id := uuid.NewString()
	message, err := utils.Encrypt(requestJSON.Secret)
	if err != nil {
		responseBody.Status = "Failure"
		responseBody.Details = "Error Creating a new secret"
		c.JSON(http.StatusBadRequest, responseBody)
		return
	}
	secret := models.Secret{
		Id:        id,
		Secret:    message,
		CreatedAt: time.Now().UTC(),
		//set expire time n minutes from now , as given in the request
		ExpiresAt: time.Now().UTC().Add(time.Minute * time.Duration(requestJSON.ExpiresIn)),
		One_time:  true,
		Viewed:    false,
	}

	err = s.services.CreateSecret(secret)
	if err != nil {
		responseBody.Status = "Failure"
		responseBody.Details = "Error Creating a new secret"
		c.JSON(http.StatusBadRequest, responseBody)
		return
	}
	responseBody.Status = "Success"
	responseBody.Link = id
	responseBody.Secret = &secret

	c.JSON(http.StatusOK, responseBody)
}

func (s *ServiceHandler) GetSecret(c *gin.Context) {
	var responseBody response
	secretID := c.Param("id")
	secret, err := s.services.GetSecret(secretID)
	if err != nil {
		responseBody.Status = "Failure"
		responseBody.Details = "Error Fetching Secret"
		c.JSON(http.StatusNotFound, responseBody)
		return
	}
	message, err := utils.Decrypt(secret.Secret)
	if err != nil {
		responseBody.Status = "Failure"
		responseBody.Details = "Something went wrong while fetching secret"
		c.JSON(http.StatusNotFound, responseBody)
		return
	}
	secret.Secret = message
	if time.Now().UTC().Sub(secret.ExpiresAt) >= 0 || secret.Viewed {
		responseBody.Status = "Failure"
		responseBody.Details = "Secret Expired or Already Viewed"
		c.JSON(http.StatusNotFound, responseBody)
		return
	}

	//spin up a goroutine to update the view status
	go func() {
		if !secret.One_time {
			return
		}
		err := s.services.UpdateViewStatus(secret.Id)
		if err != nil {
			fmt.Println("error updating secret status : id -> ", secret.Id)
		}
	}()

	responseBody.Status = "Success"
	responseBody.Secret = secret
	c.JSON(http.StatusFound, gin.H{"status": responseBody.Status, "secret": responseBody.Secret.Secret})
}

func (s *ServiceHandler) ShowStatus(c *gin.Context) {
	var responseBody response
	secretID := c.Param("id")
	secret, err := s.services.GetSecret(secretID)
	if err != nil {
		responseBody.Status = "Failure"
		responseBody.Details = "Error Fetching Secret"
		c.JSON(http.StatusNotFound, responseBody)
		return
	}
	responseBody.Status = "Success"
	responseBody.Secret = secret
	secret.Secret = ""
	c.JSON(http.StatusFound, responseBody)
}
