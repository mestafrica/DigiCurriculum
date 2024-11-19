const database = {
    totalCurricular: 12,
    totalCalendars: 8,
    totalLessonPlans: 15,
    totalAssessments: 20,
    courses: [
        { category: "A", enrollments: 50 },
        { category: "B", enrollments: 30 },
        { category: "C", enrollments: 20 },
    ],
    enrollments: [0.6, 0.7, 0.8, 0.9, 0.7, 1.0, 1.1],
};

export const fetchStatistics = async () => {
    // Fetching and processing statistics
    const { totalCurricular, totalCalendars, totalLessonPlans, totalAssessments, courses, enrollments } = database;

    // Pie  chart data for top courses
    const totalEnrollments = courses.reduce((sum, course) => sum + course.enrollments, 0);
    const courseDistribution = courses.map((course) => ({
        category: course.category,
        percentage: ((course.enrollments / totalEnrollments) * 100).toFixed(2),
    }));

    return {
        totalCurricular,
        totalCalendars,
        totalLessonPlans,
        totalAssessments,
        courseDistribution,
        enrollmentTrends: enrollments,
    };
};