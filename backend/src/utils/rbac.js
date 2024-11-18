export const permissions = [
    {
        role: 'admin',
        actions: [
            'create_curriculum',
            'update_curriculum',
            'delete_curriculum',
            'get_all_curriculums',
            'get_curriculum_by_grade',
            'bulk_get_curriculums'
        ]
       
    },
    {
        role: 'developer',
        actions: [
            'get_developer',
            'get_All_developer',
            'update_developer',
            'delete_developer',
            'create_schedule',
            'update_schedule',
            'get_all_schedule',
            'delete_schedule' 
        ]
    }
]