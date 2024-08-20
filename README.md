# Cypress BDD Automation for OrangeHRM

## Introduction

This project aims to automate end-to-end testing of the OrangeHRM open-source Human Resource Management system. By leveraging Cypress and Cucumber with a BDD testing approach, we ensure that key functionalities on the login page, administration page, and Buzz page are thoroughly tested and validated. While the project covers several scenarios within the OrangeHRM website, there are still areas that can be improved.

## Getting Started

To get started with this project:

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/rn-trnt/cypress-bdd-orangehrm.git

2. Navigate to the project directory:
   ```bash
   cd cypress-bdd-orangehrm

3. Install the necessary dependencies:
   ```bash
   npm install

4. Run the tests:
   ```bash
   npx cypress run

## Testing Scope

### 1. Login Functionality
- **Successful Login:** Validates redirection to the dashboard upon entering correct credentials.
- **Failed Login:** Handles scenarios with invalid or empty credentials, displaying appropriate error messages.

### 2. Admin Page
- **Search by User Role:** Verifies filtering of users based on selected user roles (Admin, ESS).
- **Search by Status:** Validates filtering of users by their status (Enabled, Disabled).

### 3. Buzz Page
- **Sort Buzz:** Ensures posts are sorted by criteria like Most Commented, Most Liked, and Most Recent.
- **Create Post:** Tests creation of text and photo posts with various formats.
- **Interactions:** Automates commenting, liking, and deleting posts on the Buzz page.

## Reports

Test results are generated in HTML format and can be found in the `reports` folder.
