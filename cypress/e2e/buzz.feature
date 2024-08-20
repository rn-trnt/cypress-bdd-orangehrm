Feature: Buzz Page
              As a user
              I want to post, view, and interact with Buzz

        Background:
            Given the user is successfully login and on the Buzz Page
  
  ## Sort
        Scenario Outline: Sort Buzz
             When the user sorts Buzz by "<sort option>"
             Then the updates should be displayed in order of "<sort option>" first

        Examples:
                  | sort option          |
                  | Most Commented Posts |
                  | Most Liked Posts     |
                  | Most Recent Posts    |

  ### Post
        Scenario Outline: Create a Text Post
             When the user create Post with "<Text>"
              And click the Post button
             Then the post should be posted successfully
              And the post with "<Text>" should be visible on the Buzz Page
         
        Examples:
                  | Text                |
                  | Test Dummy Post - 1 |
                  | Test Dummy Post - 2 |

        Scenario Outline: Create a Photo Post
             When the user create Post with Photo by clicking Share Photos button
              And the user write a "<caption>"
              And the user upload a "<action>"
             Then click the share button if "<action>" is successful
              And the user will see response for uploading "<action>" with caption "<caption>" on the Buzz Page
  
        Examples:
                  | caption                                   | action                        |
                  | Test upload single photo                  | Single Photo                  |
                  | Test upload multiple photos               | Multiple Photos               |
                  | Test upload photo with unsupported format | Photo with Unsupported Format |
     
  ### Comment  
        Scenario: Comment on Every Visible Post
             When the user writes "This is a comment" in the comment field for each post
             Then each post should display the comment

  ### Like
        Scenario Outline: Like Every Visible Post
             When the user likes every visible posts
             Then each post should show that it has been liked by the user


  ### Delete
        Scenario Outline: Delete Every Visible Post
             When the user deletes all visible posts
             Then no posts should be visible on the Buzz Page

