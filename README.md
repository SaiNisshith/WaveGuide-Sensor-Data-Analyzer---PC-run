# WaveGuide Sensor Data Analyzer - PC Run

## Project Title
WaveGuide Sensor Data Analyzer - PC Run

## Description
WaveGuide Sensor Data Analyzer - PC Run is a tool designed to analyze temperature data collected from a waveguide setup using PicoScope equipment and software. It employs a supervised polynomial regression machine learning model to predict temperature based on the collected wave data. The model continuously improves with more refined data input. Users can monitor live temperature data remotely via a website or through a desktop application.

## Features
- **Live Temperature Observation**: Monitor temperature data remotely from anywhere with an internet connection. Live data is accessible on the website [here](https://wda-e03r.onrender.com/), updating every 10 seconds.
- **Data Download**: Download temperature data from the past three days via both the desktop application and the website.
- **Customizable Parameters**: Adapt the tool to your specific waveguide setup by customizing various parameters, including high-point, low-point, minimum height, minimum distance, and number of notches.
- **Easy Data Training**: Simplified process for training the machine learning model with user-provided data. The model becomes more accurate as you feed it more refined data.

## Prerequisites
Before proceeding with the installation, ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)
- npm (Node.js package manager), which typically comes with Node.js installation

## Installation
1. **Clone the repository**:
    ```
    git clone https://github.com/SaiNisshith/WaveGuide-Sensor-Data-Analyzer---PC-run
    ```
2. **Set up MongoDB Atlas URL**:

    After cloning the repository, you need to set up an environment variable for the MongoDB Atlas URL.
    ```
    UWG_MONGODB_ATLAS_URL = YOUR_URL 
    ```
        
   Create the MongoDB_ATLAS Database and paste that instance in the YOUR_URL
4. **Install dependencies**:
    ```
    npm install
    ```

3. **Start the application temporarily**:
    ```
    npm start
    ```
   **Create a desktop app**:
    ```
    npm run make
    ```
   This will create a desktop application suitable for your PC. You can find the executable file in the `out/make/squirrel.windows` directory.


## Usage
1. **Setup**:
   - Ensure the waveguide and PicoScope setup is properly configured.

2. **Fill Variables**:
   - Fill in the variables on the UI according to your waveguide setup specifications:
     - High-Point (µ sec): Highest time, up to which you would like to consider in microseconds.
     - Low-Point (µ sec): Lowest time, up to which you would like to consider in microseconds.
     - Min-Height (amp): Minimum height which you would like to consider it as a peak.
     - Min-Distance (µ sec): Minimum distance between two peaks.
     - Number of Notches: Number of notches you have kept for your waveguide.

3. **Train Data**:
   - Feed excel files named with the observed temperature values. For example, if the temperature observed in the thermocouple is 35°C, save the file as `35.xlsx`.
   - Select the folder path containing the excel files and click the "Refresh the feed" button.

4. **Predictions**:
   - Monitor incoming waveform signal files for temperature predictions.
   - Select the folder path containing the waveform signal files and click the "Monitor this folder" button.

5. **Access Live Data**:
   - Access live temperature data every 10 seconds via the desktop app or the web app [here](https://wda-e03r.onrender.com/).

6. **Download Data**:
   - Download temperature data directly from the desktop or web app.

## Contact
For any inquiries, feedback, or support, please feel free to reach out:

- **Email**: [sainisshith@gmail.com](mailto:sainisshith@gmail.com)
- **LinkedIn**: [Sai Nisshith](https://www.linkedin.com/in/sai-nisshith-51a381237/)

Your feedback and suggestions are highly appreciated!

---

This README provides detailed instructions on installation, usage, and other aspects of the project. For more information, please refer to the codebase or contact the project maintainers.
