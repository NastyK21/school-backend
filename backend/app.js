import express from 'express';
import bodyparser from 'body-parser';
import prisma from './lib/prisma.js';

const app = express();

app.use(bodyparser.json());

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
}

app.post('/addSchool', async (req, res) => {
    try{
    const {name , address , latitude , longitude} = req.body;

    if (!name || !address || latitude == null || longitude == null) {
        return res.status(400).json({ error: "All fields are required" });
    }
  
    // ✅ Validate data types
    if (typeof name !== "string" || typeof address !== "string") {
        return res.status(400).json({ error: "Name and address must be strings" });
    }
    if (isNaN(latitude) || isNaN(longitude)) {
        return res.status(400).json({ error: "Latitude and longitude must be numbers" });
    }

    const school = await prisma.school.create({
        data: {
            name,
            address,
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
        },
    });

    res.status(201).json(school) 
    } catch (error) {
        console.error("Error adding school:", error);
        res.status(500).json({ error: "Internal Server Error" });
   
    }

});


app.get('/listSchools', async (req, res) => {
    try {
        let schools = await prisma.school.findMany();
        const { latitude, longitude } = req.query;

        if (!latitude || !longitude) {
            return res.status(200).json(schools);  // No coordinates, return unsorted schools
        }

        const userLat = Number(latitude);
        const userLon = Number(longitude);

        if (isNaN(userLat) || isNaN(userLon)) {
            return res.status(400).json({ error: "Latitude and longitude must be valid numbers" });
        }

        schools = schools.map(school => ({
            ...school,
            distance: calculateDistance(userLat, userLon, school.latitude, school.longitude)
        })).sort((a, b) => a.distance - b.distance);

        return res.json(schools);
    } 
    catch (error) {
        console.error("Error listing schools:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');});
  

