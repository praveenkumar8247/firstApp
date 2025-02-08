To Run the Application run "npm start" this will run both the front and mock json server

Project Structure
The project follows a modular structure to enhance maintainability and scalability. The key modules and components include:

1. App Module (AppModule)
   Acts as the root module.
   Configures core dependencies and routing.
   Imports necessary feature modules (AuthModule, EventModule).
2. Authentication Module (AuthModule)
   Manages user authentication and registration.
   Components:
   LoginComponent – Handles user login.
   RegistrationComponent – Manages new user registration.
   Services:
   AuthService – Handles authentication logic (mocked with JSON Server).
3. Event Management Module (EventModule)
   Manages event-related features.
   Components:
   EventListComponent – Displays a list of events.
   EventFormComponent – Handles event creation and editing.
   EventDetailsComponent – Shows details of a specific event.
   Services:
   EventService – Handles API interactions for event data.
4. Confirmation Dialog Component (ConfirmationDialogComponent)
   A reusable component for user confirmations (e.g., delete actions).
   Uses Angular Material’s dialog (MatDialog) for UI.

   Key Design Decisions:

   1. Modular Architecture

   Splitting features into AuthModule and EventModule improves separation of concerns.
   ConfirmationDialogComponent is a shared component, allowing reuse.

   2. Mock Backend with JSON Server

   Chosen to simplify backend simulation during development.
   Provides a REST-like API for authentication and event management.

   3. State Management Strategy

   Uses Angular services (AuthService, EventService) for data management.
   Uses RxJS (BehaviorSubject, Observables) for reactive data handling.

   4. Material Design for UI

   Angular Material was selected for a consistent, responsive UI.
   Components such as MatTable, MatDialog, and MatButton enhance UX.

   Third-Party Libraries Used

5. Angular Material – Provides UI components (@angular/material).
6. JSON Server – Mock backend for API responses (json-server).
7. RxJS – Used for managing reactive data streams (rxjs).
