#include <ESP8266WiFi.h>
#include "FirebaseESP8266.h"
#include <ArduinoJson.h>
#include <DHT.h>  

#define FIREBASE_HOST "https://adruino-7b5a8-default-rtdb.firebaseio.com"
#define FIREBASE_AUTH "GW1i69YZFfrOktu8Nu6L1JFpQEt3GrF3xwoeiW8M"
#define WIFI_SSID "Tony's Network"
#define WIFI_PASSWORD "01122003"     

String ID = "3TL73tRTSEfiPSvulZIoeJtNbOE2";

int led = 5; 
int buzzer = D6;
DHT dht11(D4, DHT11);
#define MQ7_ANALOG_PIN A0  

FirebaseData firebaseData;
String path = "/";
FirebaseJson json;
String fireStatus = "";    


void setup(){
  dht11.begin();
  pinMode(led, OUTPUT); 
  pinMode(buzzer, OUTPUT);
  Serial.begin(9600);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);    
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }                        
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.reconnectWiFi(true);
  if(!Firebase.beginStream(firebaseData, path))
  {
    Serial.println("Reason: " + firebaseData.errorReason());
    Serial.println();
  }

  Serial.println("Connected :");
  Serial.println(WiFi.localIP());
  Serial.println();
}

void loop(){
  float temp = dht11.readTemperature();
  int humid = dht11.readHumidity();

  int sensorValue = analogRead(MQ7_ANALOG_PIN);
  int smoke = map(sensorValue, 0, 1023, 0, 100);

  Firebase.setFloat(firebaseData , "/" + ID + "/temperature", temp);    
  Firebase.setFloat(firebaseData , "/" + ID + "/humidity", humid);
  Firebase.setInt(firebaseData , "/" + ID + "/smoke", smoke);         

  checkValue(temp, smoke);
}


void Blink(){
  for(int i = 0; i < 10; i++){
    tone(buzzer, 1000, 200);
    digitalWrite(led, HIGH);
    delay(500);
    tone(buzzer, 1000, 200);
    digitalWrite(led, LOW);
    delay(500);
  }
}

void checkValue(float t, int smoke){
  if(t > 45 || smoke > 55){
    tone(buzzer, 1000, 200);
    Blink();
    tone(buzzer, 1000, 200);
  }
  else{
    digitalWrite(led, LOW);
    delay(2000);
  }
}
