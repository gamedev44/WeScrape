The goal of the "Video Scraper" application is to extract and preview the video source URL from a given webpage URL containing the <video></video> tag. Once the video source URL is extracted, users can preview the video and even download it if they wish.

How it works:

The user runs the video_scraper_menu.bat batch file.
The batch file checks if Node.js is installed on the user's system. If not, it provides an option to download and install Node.js manually.
After Node.js is installed (if required), the batch file proceeds to run the RunFirstInstall.bat batch file.
RunFirstInstall.bat changes the directory to the React.js project folder, installs the necessary npm packages using npm install, and waits for 15 seconds to ensure the installation completes.
After the installation, the batch file calls RunLocalAppApp.bat.
RunLocalAppApp.bat changes the directory to the React.js project folder and starts the React.js app using npm start.
The React.js app is now accessible from the browser at http://localhost:3000.
The React.js app provides an input field where the user can enter a URL containing the <video></video> tag.
When the user clicks the "Get Video URL" button, the React.js app sends a request to the Node.js server (server.js) to fetch the video source URL from the provided URL.
The Node.js server uses the axios and cheerio libraries to make an HTTP request to the provided URL and then uses cheerio to parse the HTML and extract the video source URL from the <video> tag.
If the video source URL is found, it is sent back as a response to the React.js app, which then displays a video player to preview the video.
If the video source URL is not found or any error occurs during the process, an appropriate message is shown to the user.
Regarding the issue with a black screen, the black screen might occur if there are issues with the React.js app, such as an incorrect video URL or a problem with the video player library. To troubleshoot this, check the following:

Ensure that the video URL entered by the user is valid and contains the <video></video> tag.
Confirm that the video player library (ReactPlayer in this case) is correctly installed and configured in the React.js app.
Check the developer console of the browser for any errors or messages that might provide insights into the issue.
