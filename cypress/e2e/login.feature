Feature: Login Functionality
              As a user
              I want to be able to log in to the OrangeHRM system
              So that I can access my account and its features

        Background:
            Given the user is on the login page

        Scenario: Successful Login
             When the user enters valid credentials
              And clicks the Login button
             Then the user should be redirected to the dashboard

        Scenario Outline: Failed Login
             When the user enters "<username>" as the username
              And enters "<password>" as the password
              And clicks the Login button
             Then an "<error message>" should be displayed indicating the username or password is incorrect

        Examples:
                  | username    | password    | error message       |
                  | InvalidUser | admin123    | Invalid credentials |
                  | Admin       | invalidPass | Invalid credentials |
                  | InvalidUser | invalidPass | Invalid credentials |

        Scenario: Failed Login with Empty Credentials
             When the user leaves the username and password field blank
              And clicks the Login button
             Then the username and password fields become active, displaying the text "Required"
