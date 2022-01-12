/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ec.edu.espe.fastsplash.controller;

import com.mongodb.client.MongoDatabase;

/**
 *
 * @author Fernando
 */
public class ConnectMongo {
     MongoDBManager mongoDB = new MongoDBManager();
    
    public static MongoDatabase database;
    public void connectData(){
        database = mongoDB.conecction();
       
    }
}
