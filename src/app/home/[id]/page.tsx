"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

const Home = ({ params }: { params: { id: string } }) => {

    const[username, SetUsername] = useState<string>();

    useEffect(() => {
        const decodeParams = async () => {
            try {
                const response = await axios.get("/auth/user/home");
                SetUsername(response.data.username);
            } catch (error) {
                if (axios.isAxiosError(error) && error.response) {
                    const { status, data } = error.response;
                    console.log(status);
                    if (status === 404) {
                        toast.error(data.error || "Data Not Found", {
                            duration: 2500
                        });
                    }
                } else {
                    toast.error("An unexpected error occurred. Please try again.", {
                        duration: 2500
                    });
                }
            }
        };
    
        decodeParams();
    }, []);

    console.log(username);
    

  return (
    <React.Fragment>
        Hello
    </React.Fragment>
  )
}

export default Home