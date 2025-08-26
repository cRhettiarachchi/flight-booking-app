import express, { Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import { airportRoutes, flightRoutes, bookingRoutes } from "./routes";

// Create Express app
const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors());

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "OK",
    message: "Server is healthy",
    uptime: process.uptime(),
  });
});

// API routes
app.use("/api/airports", airportRoutes);
app.use("/api/flights", flightRoutes);
app.use("/api/bookings", bookingRoutes);

export default app;
