
<%@page import="org.json.simple.JSONObject"%>
<%@page import="org.json.simple.parser.JSONParser"%>
<%@page import="org.bson.Document"%>
<%@page import="ec.edu.espe.fastsplash.controller.MongoDBManager"%>
<%@page import="ec.edu.espe.fastsplash.controller.ConnectMongo"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>
        <h1>Hello World!</h1>
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

            String username;
            username = request.getParameter("username");
            String password;
            password = request.getParameter("password");

            JSONParser parserUser = new JSONParser();
            JSONObject jsonUser = (JSONObject) parserUser.parse(mongoDB.find("users", "username", username, ConnectMongo.database));

            JSONParser parserUser2 = new JSONParser();
            JSONObject jsonUser2 = (JSONObject) parserUser2.parse(mongoDB.find2("users", "username", username, ConnectMongo.database));

            if((username=="admin")&&(password=="admin")){
                out.println("<script>window.location.replace('../html/indexAdm.html');</script>");
            }else{
                
                 if ((jsonUser.get("username").toString().equals(username) || jsonUser2.get("username").toString().equals(username)) && (jsonUser.get("password").toString().equals(password) || jsonUser2.get("password").toString().equals(password))) {

                out.println("<script>window.location.replace('../html/IndexUser.html');</script>");
            } else {
                out.println("No Logged");
                out.println("<script>window.location.replace('../Forms/LogIn.html');</script>");
            }

                
                
            }
            
            
           
        %>
    </body>
</html>
