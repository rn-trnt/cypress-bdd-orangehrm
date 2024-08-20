Feature: Admin Page

        Background:
            Given the user is successfully login and on the Admin Page

        Scenario: Search by User Role
             When the user click on User Role dropdown
              And the user selects the '<user role>' role
              And the user click the Search button
             Then the user should be able to search and view results for the '<user role>' role

        Examples:
                  | user role |
                  | Admin     |
                  | ESS       |

        Scenario: Search by Status
             When the user click on Status dropdown
              And the user selects the "<status>"
              And the user click the Search button
             Then all user with the "<status>" status should be displayed

        Examples:
                  | status   |
                  | Enabled  |
                  | Disabled |
