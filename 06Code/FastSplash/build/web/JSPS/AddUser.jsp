
<%@page import="org.json.simple.JSONObject"%>
<%@page import="org.json.simple.parser.JSONParser"%>
<%@page import="org.bson.Document"%>
<%@page import="ec.edu.espe.fastsplash.controller.MongoDBManager"%>
<%@page import="ec.edu.espe.fastsplash.controller.MongoDBManager"%>
<%@page import="ec.edu.espe.fastsplash.controller.ConnectMongo"%>
<%@page import="ec.edu.espe.fastsplash.controller.ConnectMongo"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>
        <h1>Hello Employee!</h1>
        This form is using-->        
        <%--This is to print a value of a variable or a method call --%>
        <%= request.getMethod()%>
        method
        <hr>
        <br>
        <%
            ConnectMongo connectMongo = new ConnectMongo();
            connectMongo.connectData();
            MongoDBManager mongoDB = new MongoDBManager();
            Document document = new Document();
            
            String names;
            names = request.getParameter("names");
            String lastName;
            lastName = request.getParameter("lastName");
            String username;
            username = request.getParameter("username");
            String password;
            password = request.getParameter("password");
            String identification;
            identification = request.getParameter("identification");
            String address;
            address = request.getParameter("address");
            String email;
            email = request.getParameter("email");
         
            
            out.println(mongoDB.find2("users", "username", username, ConnectMongo.database));
            JSONParser parser2 = new JSONParser();
            JSONObject json2 = (JSONObject) parser2.parse(mongoDB.find("users", "username", username, ConnectMongo.database));
            
            
            JSONParser parser = new JSONParser();
            JSONObject json = (JSONObject) parser.parse(mongoDB.find2("users", "username", username, ConnectMongo.database));
            out.println("<br>"+json.get("username").toString());
             out.println(username);
            if (json.get(("username").toString()).equals(username)|| json2.get(("username").toString()).equals(username)) {
                
                 out.println("<br/> This user already exists, try again");
                 
                
            } else {
              
               
                document.put("names", names);
                document.put("lastNames", lastName);
                document.put("username", username);
                document.put("password", password);
                document.put("identification", identification);
                document.put("address", address);
                document.put("email", email);
                mongoDB.save(document, "users", ConnectMongo.database);
                out.println("<br/> User created successfully");
                 out.println("<script>window.location.replace('../Forms/LogIn.html');</script>");
            }

            // mongoDB.save(document, "users", ConnectMongo.database);

        %>

    </body>
</html>
