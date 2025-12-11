const STORAGE_KEY = 'SHUTDOWN_FORM_DATA'

export function getShutdownData() {
    try {
        let incidents = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
        
        // Add demo data if empty
        if (incidents.length === 0) {
            incidents = [
                {
                    id: 1,
                    damage_type: 'დაბალი ძაბვა',
                    problem_status: 'closed',
                    incident_date: '2024-11-15',
                    city: 'ბათუმი',
                    street: 'ბარათაშვილის ქუჩა',
                    object: 'საცხოვრებელი სახლი',
                    sender_fullname: 'ნინო გელაშვილი',
                    receiver_fullname: 'დავით ნოზაძე',
                    taken_actions: 'ძაბვის მაჩვენებელი შემოწმებულია, ტრანსფორმატორი გადაყენებულია',
                    fix_time: '2024-11-15T14:30',
                    note: 'პრობლემა გადაწყვეტილია სწრაფად',
                    incident_time: '15.11.2024 12:15'
                },
                {
                    id: 2,
                    damage_type: 'სრული გათიშვა',
                    problem_status: 'in_progress',
                    incident_date: '2024-11-20',
                    city: 'ქობულეთი',
                    street: 'ცენტრალური ქუჩა',
                    object: 'სკოლა',
                    sender_fullname: 'თამარ ხაშური',
                    receiver_fullname: 'გიორგი მეგრელიშვილი',
                    taken_actions: 'საავარიო ბრიგადა გაიგზავნა ადგილზე',
                    fix_time: '',
                    note: 'მუშაობა მიმდინარეობს',
                    incident_time: '20.11.2024 09:30'
                },
                {
                    id: 3,
                    damage_type: 'ხაზის დაზიანება',
                    problem_status: 'closed',
                    incident_date: '2024-12-01',
                    city: 'ბათუმი',
                    street: 'აღმაშენებლის პროსპექტი',
                    object: 'მაღაზია',
                    sender_fullname: 'ლევან კაცია',
                    receiver_fullname: 'ანა ჯაფარიძე',
                    taken_actions: 'დაზიანებული კაბელი შეცვლილია',
                    fix_time: '2024-12-01T16:45',
                    note: 'ახალი კაბელი დაყენებულია',
                    incident_time: '01.12.2024 14:20'
                },
                {
                    id: 4,
                    damage_type: 'დაბალი ძაბვა',
                    problem_status: 'waiting',
                    incident_date: '2024-12-05',
                    city: 'ოზურგეთი',
                    street: 'რუსთაველის ქუჩა',
                    object: 'ბაგა',
                    sender_fullname: 'მარინე შუბითიძე',
                    receiver_fullname: 'ალექსანდრე ღვინიაშვილი',
                    taken_actions: 'განაცხადი მიღებულია',
                    fix_time: '',
                    note: 'მოლოდინშია ტექნიკური ბრიგადის ჩასვლა',
                    incident_time: '05.12.2024 11:45'
                },
                {
                    id: 5,
                    damage_type: 'ტრანსფორმატორის პრობლემა',
                    problem_status: 'closed',
                    incident_date: '2024-12-08',
                    city: 'ბათუმი',
                    street: 'ნინოშვილის ქუჩა',
                    object: 'ოფისი',
                    sender_fullname: 'ნუგზარ ბერაია',
                    receiver_fullname: 'ნინო აბრამიშვილი',
                    taken_actions: 'ტრანსფორმატორი შეცვლილია ახლით',
                    fix_time: '2024-12-08T11:20',
                    note: 'ყველაფერი წესრიგშია',
                    incident_time: '08.12.2024 08:30'
                },
                {
                    id: 6,
                    damage_type: 'სრული გათიშვა',
                    problem_status: 'in_progress',
                    incident_date: '2024-12-09',
                    city: 'ქობულეთი',
                    street: 'სანაპირო ქუჩა',
                    object: 'საავადმყოფო',
                    sender_fullname: 'ელენე ღლონტი',
                    receiver_fullname: 'იოანე მაისურაძე',
                    taken_actions: 'ავარიული გენერატორი ჩართულია',
                    fix_time: '',
                    note: 'პრიორიტეტული ობიექტია',
                    incident_time: '09.12.2024 16:20'
                },
                {
                    id: 7,
                    damage_type: 'დაბალი ძაბვა',
                    problem_status: 'closed',
                    incident_date: '2024-12-02',
                    city: 'ბათუმი',
                    street: 'ვაჟა-ფშაველას ქუჩა',
                    object: 'კაფე/რესტორანი',
                    sender_fullname: 'ზურაბ ლომიძე',
                    receiver_fullname: 'კეთევან ღონღაძე',
                    taken_actions: 'ძაბვის სტაბილიზატორი დამონტაჟებულია',
                    fix_time: '2024-12-02T13:15',
                    note: 'ძაბვა ნორმალური დონეზე დაბრუნდა',
                    incident_time: '02.12.2024 10:30'
                },
                {
                    id: 8,
                    damage_type: 'ხაზის დაზიანება',
                    problem_status: 'waiting',
                    incident_date: '2024-12-10',
                    city: 'ხელვაჩაური',
                    street: 'ცენტრალური ქუჩა',
                    object: 'ფარმაცია',
                    sender_fullname: 'რუსუდან ხარაიშვილი',
                    receiver_fullname: 'გიორგი თუშიშვილი',
                    taken_actions: 'ინსპექტირება ჩატარდა',
                    fix_time: '',
                    note: 'საჭიროა სპეციალური აღჭურვილობა',
                    incident_time: '10.12.2024 13:45'
                },
                {
                    id: 9,
                    damage_type: 'სრული გათიშვა',
                    problem_status: 'closed',
                    incident_date: '2024-11-25',
                    city: 'ბათუმი',
                    street: 'გოგებაშვილის ქუჩა',
                    object: 'ბანკი',
                    sender_fullname: 'გიორგი ქართველიშვილი',
                    receiver_fullname: 'სალომე ბერიძე',
                    taken_actions: 'მთავარი ხაზი აღდგენილია',
                    fix_time: '2024-11-25T10:30',
                    note: 'ელექტრომომარაგება სრულადაა აღდგენილი',
                    incident_time: '25.11.2024 08:15'
                },
                {
                    id: 10,
                    damage_type: 'ტრანსფორმატორის პრობლემა',
                    problem_status: 'in_progress',
                    incident_date: '2024-12-09',
                    city: 'ქობულეთი',
                    street: 'ალექსიძის ქუჩა',
                    object: 'სპორტული კომპლექსი',
                    sender_fullname: 'ირაკლი ფუტკარაძე',
                    receiver_fullname: 'ნათია ჯიქია',
                    taken_actions: 'ტრანსფორმატორის შემოწმება მიმდინარეობს',
                    fix_time: '',
                    note: 'შესაძლოა საჭირო გახდეს სრული შეცვლა',
                    incident_time: '09.12.2024 15:10'
                }
            ]
            // Save demo data to localStorage
            saveShutdownData(incidents)
        }
        
        return incidents
    } catch {
        return []
    }
}

export function saveShutdownData(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}
