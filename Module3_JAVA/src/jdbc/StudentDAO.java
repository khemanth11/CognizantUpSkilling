import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;

public class StudentDAO {

    static String url =
            "jdbc:mysql://localhost:3306/event_management";

    static String username = "root";

    static String password = "Mano220208";

    public static void insertUser() {

        try {

            Connection connection = DriverManager.getConnection(
                    url,
                    username,
                    password
            );

            String query =
                    "INSERT INTO users(full_name,email,city,registration_date) VALUES(?,?,?,?)";

            PreparedStatement ps =
                    connection.prepareStatement(query);

            ps.setString(1, "New User");

            ps.setString(2, "newuser@example.com");

            ps.setString(3, "Miami");

            ps.setString(4, "2025-07-01");

            ps.executeUpdate();

            System.out.println("User Inserted");

            connection.close();

        } catch (Exception e) {

            System.out.println(e.getMessage());

        }

    }

    public static void updateUser() {

        try {

            Connection connection = DriverManager.getConnection(
                    url,
                    username,
                    password
            );

            String query =
                    "UPDATE users SET city=? WHERE user_id=?";

            PreparedStatement ps =
                    connection.prepareStatement(query);

            ps.setString(1, "Boston");

            ps.setInt(2, 1);

            ps.executeUpdate();

            System.out.println("User Updated");

            connection.close();

        } catch (Exception e) {

            System.out.println(e.getMessage());

        }

    }

    public static void main(String[] args) {

        insertUser();

        updateUser();

    }

}