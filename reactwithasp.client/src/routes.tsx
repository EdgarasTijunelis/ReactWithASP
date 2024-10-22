import { Layout } from "@/pages/Layout";
import Home from "@/pages/HomePage/Home";
import SignUp from "@/pages/auth/SignUpPage/SignUp";
import SignIn from "@/pages/auth/SignInPage/SignIn";
import {createBrowserRouter} from "react-router-dom";
import { ProtectedRoute } from "@/ProtectedRoute";
import Students from "@/pages/StudentsPage/Students";
import Dashboard from "@/pages/admin/DashboardPage/Dashboard";
import Lecturers from "./pages/LecturersPage/Lecturers";
import Groups from "./pages/GroupsPage/Groups";
import Subjects from "./pages/SubjectsPage/Subjects";
import Programmes from "./pages/StudyProgrammesPage/StudyProgrammes";

export function router() {
    return createBrowserRouter([
        {
            path: "/",
            Component: Layout,
            children: [
                {
                    index: true,
                    Component: Home
                },
                {
                    path: 'students',
                    element: <ProtectedRoute><Students/></ProtectedRoute>
                },
                {
                    path: 'lecturers',
                    element: <ProtectedRoute><Lecturers /></ProtectedRoute>
                },
                {
                    path: 'groups',
                    element: <ProtectedRoute><Groups /></ProtectedRoute>
                },
                {
                    path: 'subjects',
                    element: <ProtectedRoute><Subjects /></ProtectedRoute>
                },
                {
                    path: 'programmes',
                    element: <ProtectedRoute><Programmes /></ProtectedRoute>
                },
                {
                    path: 'auth/signup',
                    Component: SignUp,
                },
                {
                    path: 'auth/signin',
                    Component: SignIn,
                },
                {
                    path: 'admin/dashboard',
                    element: <ProtectedRoute><Dashboard/></ProtectedRoute>
                }
            ]
        },
    ]);
}