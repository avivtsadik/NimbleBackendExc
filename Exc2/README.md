# Exc2

To run this project, follow these steps:

1. Navigate to the `Exc2` directory:

    ```bash
    cd Exc2
    ```

2. Create a `.env` file in this directory with the following content:

    ```
    NUMBER_OF_SERVERS=6
    ```

   You can adjust the value of `NUMBER_OF_SERVERS` to any number you want.

3. Make sure you have Docker and Docker Compose installed on your machine.

4. Run the following command to start the application:

    ```bash
    docker-compose --env-file .env up
    ```

   This command will build and start the Docker containers specified in the `docker-compose.yaml` file using the environment variables defined in the `.env` file.

5. Access the application at `http://localhost:80`

If you encounter any issues or have questions, feel free to reach out.
