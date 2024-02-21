# WaveGuide Sensor Data Analyzer - PC Run

## Project Title
WaveGuide Sensor Data Analyzer - PC Run

## Description
This project aims to analyze temperature data collected from a waveguide setup using PicoScope equipment and software. It utilizes a supervised polynomial regression machine learning model to predict temperature based on the collected wave data. The trained model continuously improves with more refined data input. Users can monitor live temperature data remotely via a website or through a desktop application.

## Features
- **Live Temperature Observation**: Monitor temperature data remotely from anywhere with an internet connection.
- **Data Download**: Download temperature data from the past three days via both the desktop application and the website.
- **Customizable Parameters**: Users can customize various parameters to adapt to their specific waveguide setup.
- **Easy Data Training**: Simplified process for training the machine learning model with user-provided data.

## Installation
1. **Clone the repository**:
    ```
    git clone https://github.com/SaiNisshith/WaveGuide-Sensor-Data-Analyzer---PC-run
    ```

2. **Install dependencies**:
    ```
    npm install
    ```

3. **To temporarily test the app, run**:
    ```
    npm start
    ```
   **To create a desktop app for your PC, run**:
    ```
    npm run make
    ```

4. **Navigate to the `out/make/squirrel.windows` directory** to find the `.exe` file for the desktop app.

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
   - Feed excel files named with the observed temperature values.
   - Save the files with the temperature observed in the thermocouple (e.g., `35.xlsx` for 35°C).
   - Select the folder path and click "Refresh the feed" button.

4. **Predictions**:
   - Monitor incoming waveform signal files for temperature predictions.
   - Select the folder path and click "Monitor this folder" button.

5. **Access Live Data**:
   - Access live temperature data every 10 seconds via the desktop app or the web app [here](https://wda-e03r.onrender.com/).

6. **Download Data**:
   - Download temperature data directly from the desktop or web app.

## Contact
For any inquiries or support, please email sainisshith@gmail.com or connect with me on [LinkedIn](https://www.linkedin.com/in/sai-nisshith-51a381237/).

---

This README provides detailed instructions on installation, usage, and other aspects of the project. For more information, please refer to the codebase or contact the project maintainers.
