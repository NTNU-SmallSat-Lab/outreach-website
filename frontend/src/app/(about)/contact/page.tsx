"use client";
import { useState } from "react";
import { ContactCard } from "@/components/ContactCard";
import { Separator } from "@/components/ui/separator";
export default function ContactPage() {
    const people = [
        {
            name: "Roger Birkeland",
            role: "Researcher, Phd",
            img: "https://backends.it.ntnu.no/user-profile-service/rest/files/e0510fd5-0b1f-3620-8d31-087e1f3ebb58",
            mail: "roger@mail.no",
            phone: "+47 12343390",
            externalUrl: "https://www.ntnu.edu/employees/roger.birkeland",
        },
        {
            name: "Yooooo Birkeland",
            role: "Researcher, Phd",
            img: "https://backends.it.ntnu.no/user-profile-service/rest/files/e0510fd5-0b1f-3620-8d31-087e1f3ebb58",
            mail: "roger@mail.no",
            phone: "+47 12343390",
            externalUrl: "https://www.ntnu.edu/employees/roger.birkeland",
        },
        {
            name: "Yooooo Birkeland",
            role: "Researcher, Phd",
            img: "https://backends.it.ntnu.no/user-profile-service/rest/files/e0510fd5-0b1f-3620-8d31-087e1f3ebb58",
            mail: "roger@mail.no",
            phone: "+47 12343390",
            externalUrl: "https://www.ntnu.edu/employees/roger.birkeland",
        },
        {
            name: "Yooooo Birkeland",
            role: "Researcher, Phd",
            img: "https://backends.it.ntnu.no/user-profile-service/rest/files/e0510fd5-0b1f-3620-8d31-087e1f3ebb58",
            mail: "roger@mail.no",
            phone: "+47 12343390",
            externalUrl: "https://www.ntnu.edu/employees/roger.birkeland",
        },
        {
            name: "Yooooo Birkeland",
            role: "Researcher, Phd",
            img: "https://backends.it.ntnu.no/user-profile-service/rest/files/e0510fd5-0b1f-3620-8d31-087e1f3ebb58",
            mail: "roger@mail.no",
            phone: "+47 12343390",
            externalUrl: "https://www.ntnu.edu/employees/roger.birkeland",
        },
        {
            name: "Yooooo Birkeland",
            role: "Researcher, Phd",
            img: "https://backends.it.ntnu.no/user-profile-service/rest/files/e0510fd5-0b1f-3620-8d31-087e1f3ebb58",
            mail: "roger@mail.no",
            phone: "+47 12343390",
            externalUrl: "https://www.ntnu.edu/employees/roger.birkeland",
        },
        {
            name: "Yooooo Birkeland",
            role: "Researcher, Phd",
            img: "https://backends.it.ntnu.no/user-profile-service/rest/files/e0510fd5-0b1f-3620-8d31-087e1f3ebb58",
            mail: "roger@mail.no",
            phone: "+47 12343390",
            externalUrl: "https://www.ntnu.edu/employees/roger.birkeland",
        },
        {
            name: "Yooooo Birkeland",
            role: "Researcher, Phd",
            img: "https://backends.it.ntnu.no/user-profile-service/rest/files/e0510fd5-0b1f-3620-8d31-087e1f3ebb58",
            mail: "roger@mail.no",
            phone: "+47 12343390",
            externalUrl: "https://www.ntnu.edu/employees/roger.birkeland",
        },
        {
            name: "Yooooo Birkeland",
            role: "Researcher, Phd",
            img: "https://backends.it.ntnu.no/user-profile-service/rest/files/e0510fd5-0b1f-3620-8d31-087e1f3ebb58",
            mail: "roger@mail.no",
            phone: "+47 12343390",
            externalUrl: "https://www.ntnu.edu/employees/roger.birkeland",
        },
        {
            name: "Yooooo Birkeland",
            role: "Researcher, Phd",
            img: "https://backends.it.ntnu.no/user-profile-service/rest/files/e0510fd5-0b1f-3620-8d31-087e1f3ebb58",
            mail: "roger@mail.no",
            phone: "+47 12343390",
            externalUrl: "https://www.ntnu.edu/employees/roger.birkeland",
        },
        {
            name: "Yooooo Birkeland",
            role: "Researcher, Phd",
            img: "https://backends.it.ntnu.no/user-profile-service/rest/files/e0510fd5-0b1f-3620-8d31-087e1f3ebb58",
            mail: "roger@mail.no",
            phone: "+47 12343390",
            externalUrl: "https://www.ntnu.edu/employees/roger.birkeland",
        },
        {
            name: "Yooooo Birkeland",
            role: "Researcher, Phd",
            img: "https://backends.it.ntnu.no/user-profile-service/rest/files/e0510fd5-0b1f-3620-8d31-087e1f3ebb58",
            mail: "roger@mail.no",
            phone: "+47 12343390",
            externalUrl: "https://www.ntnu.edu/employees/roger.birkeland",
        },
        {
            name: "Yooooo Birkeland",
            role: "Researcher, Phd",
            img: "https://backends.it.ntnu.no/user-profile-service/rest/files/e0510fd5-0b1f-3620-8d31-087e1f3ebb58",
            mail: "roger@mail.no",
            phone: "+47 12343390",
            externalUrl: "https://www.ntnu.edu/employees/roger.birkeland",
        },
        {
            name: "Yooooo Birkeland",
            role: "Researcher, Phd",
            img: "https://backends.it.ntnu.no/user-profile-service/rest/files/e0510fd5-0b1f-3620-8d31-087e1f3ebb58",
            mail: "roger@mail.no",
            phone: "+47 12343390",
            externalUrl: "https://www.ntnu.edu/employees/roger.birkeland",
        },
        {
            name: "Yooooo Birkeland",
            role: "Researcher, Phd",
            img: "https://backends.it.ntnu.no/user-profile-service/rest/files/e0510fd5-0b1f-3620-8d31-087e1f3ebb58",
            mail: "roger@mail.no",
            phone: "+47 12343390",
            externalUrl: "https://www.ntnu.edu/employees/roger.birkeland",
        },
        {
            name: "Yooooo Birkeland",
            role: "Researcher, Phd",
            img: "https://backends.it.ntnu.no/user-profile-service/rest/files/e0510fd5-0b1f-3620-8d31-087e1f3ebb58",
            mail: "roger@mail.no",
            phone: "+47 12343390",
            externalUrl: "https://www.ntnu.edu/employees/roger.birkeland",
        },
    ];

    const [selectedPerson, setSelectedPerson] = useState(people[0]);

    return (
        <div className="flex flex-col md:flex-row h-screen">
            <div className="w-full md:w-1/2 flex justify-center items-center">
                <div>
                    <p>
                        <strong>Name:</strong> {selectedPerson.name}
                    </p>
                    <p>
                        <strong>Email:</strong> {selectedPerson.mail}
                    </p>
                    <p>
                        <strong>Phone:</strong> {selectedPerson.phone}
                    </p>
                    <Separator />
                </div>
            </div>

            <div className="w-full md:w-1/2 flex flex-wrap justify-center items-start h-full overflow-y-auto">
                {people.map((person, index) => (
                    <ContactCard
                        key={index}
                        imageUrl={person.img}
                        name={person.name}
                        role={person.role}
                        externalUrl={person.externalUrl}
                        handleClick={() => setSelectedPerson(person)}
                    />
                ))}
            </div>
        </div>
    );
}
