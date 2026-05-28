import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class JDBCConnection {

    public static void main(String[] args) {

        String url = "jdbc:mysql://localhost:3306/event_management";

        String username = "root";

        String password = "Mano220208";

        try {

            Connection connection = DriverManager.getConnection(
                    url,
                    username,
                    password
            );

            Statement statement = connection.createStatement();

            ResultSet resultSet = statement.executeQuery(
                    "SELECT * FROM users"
            );

            while (resultSet.next()) {

                System.out.println(
                        resultSet.getInt("user_id")
                        + " "
                        + resultSet.getString("full_name")
                );

            }

            connection.close();

        } catch (Exception e) {

            System.out.println(e.getMessage());

        }

    }

}