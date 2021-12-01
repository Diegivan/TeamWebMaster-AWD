/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ec.edu.espe.fastsplash.controller;

import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.MongoClientURI;
import com.mongodb.MongoSecurityException;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import static com.mongodb.client.model.Filters.eq;
import static com.mongodb.client.model.Filters.gte;
import static com.mongodb.client.model.Updates.set;
import ec.edu.espe.fastsplash.model.MongoDB;
import org.bson.Document;
import org.bson.conversions.Bson;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

/**
 *
 * @author Fernando
 */
public class MongoDBManager {

    MongoDB mongoDB = new MongoDB();

    public MongoDatabase conecction() {

        String URI = "mongodb+srv://Luis:admin@cluster0.wls1x.mongodb.net/FastSplash?retryWrites=true&w=majority";
        try {
            mongoDB.setUri(new MongoClientURI(URI));
            mongoDB.setMongoClient(new com.mongodb.MongoClient(mongoDB.getUri()));
            mongoDB.setDatabase(mongoDB.getMongoClient().getDatabase("FastSplash"));
            mongoDB.setCollection(mongoDB.getDatabase().getCollection("Comprobation"));
            mongoDB.getCollection().drop();
        } catch (MongoSecurityException a) {
            mongoDB.setDatabase(null);
        }
        return mongoDB.getDatabase();
    }

    public void save(Document document, String collection, MongoDatabase database) {
        MongoCollection<org.bson.Document> collectionDocument = database.getCollection(collection);
        collectionDocument.insertOne(document);
    }

    public void update(String col, String key, Object value, Object newValue, MongoDatabase database) {
        MongoCollection<Document> collection = database.getCollection(col);
        Bson filter = eq(key, value);
        Bson update = set(key, newValue);
        collection.findOneAndUpdate(filter, update);
    }

    public String find(String col, String key, Object value, MongoDatabase database) {
         String find = "";
        MongoCollection<Document> collections = database.getCollection(col);
        FindIterable<Document> iterable = collections.find(gte(key, value));
        MongoCursor<Document> cursor = iterable.iterator();
        while (cursor.hasNext()) {
            find = cursor.next().toJson();
           
        }
        return find;
    }
    
    public String find2(String col, String key, Object value, MongoDatabase database) {
        String find = "";
        MongoCollection<Document> collections = database.getCollection(col);
        FindIterable<Document> iterable = collections.find(gte(key, value));
        MongoCursor<Document> cursor = iterable.iterator();
        while (cursor.hasNext()) {
            find = cursor.next().toJson();
            break;
        }
        return find;
    }

 public void update2(String col, String key, Object value, MongoDatabase database) {
        MongoCollection<Document> collection = database.getCollection(col);
        Bson filter = eq(key, value);
        System.out.println(filter);
    }
   

    public void delete(String col, String key, Object value, MongoDatabase database) {
        MongoCollection<Document> collection = database.getCollection(col);
        Bson filter = eq(key, value);
        collection.findOneAndDelete(filter);
    }

    public String completeModel(String col, MongoDatabase database) throws ParseException {
        String json = "";
        JSONArray jsonArray = new JSONArray();
        MongoCollection<Document> collection = database.getCollection(col);
        MongoCursor<Document> resultDocument = collection.find().iterator();
        while (resultDocument.hasNext()) {
            JSONObject jsonObject = (JSONObject) new JSONParser().parse(resultDocument.next().toJson());
            jsonObject.remove("_id");
            jsonArray.add(jsonObject);
            json = jsonArray.toJSONString();
        }
        return json;
    }
}
