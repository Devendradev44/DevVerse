"use client"
import supabase from '@/services/supabase';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Header from './_components/Header';
import DisplayResult from './_components/DisplayResult';
import { LucideImage, LucideList, LucideSparkles, LucideVideo } from 'lucide-react';

const tabs = [
    {label: 'Answer', icon: LucideSparkles},
    {label: 'Images', icon: LucideImage},
    {label: 'Videos', icon: LucideVideo},
    {label: 'Sources', icon: LucideList, badge: 10},
];

function SearchQueryResult() {
    const {libId} = useParams();
    const [searchInputRecord, setSearchInputRecord] = useState();

    useEffect(() => {
        GetSearchQueryRecord();
    }, []);

    const GetSearchQueryRecord = async() =>{
        //fetch the search query record from supabase based on libId
    let {data: Library, error} = await supabase
        .from('Library')
        .select('*')
        .eq('libId', libId);
    console.log(Library[0]);
    searchInputRecord(Library[0]);
    }
    return (
        <div>
            <Header searchInputRecord={searchInputRecord} />
            <div className='px-10 md:px-20 lg:px-36 xl:px-56 mt-220'>
                <DisplayResult searchInputRecord={searchInputRecord} />
            </div>
        </div>
    )
}

export default SearchQueryResult
