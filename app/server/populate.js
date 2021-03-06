Meteor.methods({
    'populate':function(){
        // let specialty : "Diagnostic Radiology";
        // Specialties.insert({name:specialty});
        // SubSpecialties.insert({name:"Brain Scan",specialty:specialty});
        //
        // specialty : "Muscle & Reflex";
        // Specialties.insert({name:specialty});
        // SubSpecialties.insert({name:"Shoulder Therapy",specialty:specialty});
        //
        //
        // specialty : "Neurological Surgery";
        // Specialties.insert({name:specialty});
        // SubSpecialties.insert({name:"Spine Surgeon",specialty:specialty});
        // SubSpecialties.insert({name:"Neck Cracker",specialty:specialty});
        //
        // specialty : "Ophthalmology";
        // Specialties.insert({name:specialty});
        // SubSpecialties.insert({name:"Joint Muscle Test",specialty:specialty});
        

        // PORTON HEALTH's STARTING 9 SPECIALTIES AS OF SEPTEMBER 30 alpha
        
        Specialties.insert({value:"Cardiology", name:"Cardiology"});
        Specialties.insert({value:"Dermatology", name:"Dermatology"});
        Specialties.insert({value:"Endocrinology", name:"Endocrinology"});
        Specialties.insert({value:"Family Medicine", name:"Family Medicine"});

        Specialties.insert({value:"Neurology", name:"Neurology"});
        Specialties.insert({value:"Oncology", name:"Oncology"});
        Specialties.insert({value:"Pulmonology", name:"Pulmonology"});
        Specialties.insert({value:"Rehabilitation Medicine", name:"Rehabilitation Medicine"});
        Specialties.insert({value:"Sports Medicine - Orthopaedics", name:"Sports Medicine - Orthopaedics"});
        
        




        // Specialties.insert({value:"Abdominal Surgery", name:"Abdominal Surgery"});
        // Specialties.insert({value:"Addiction Medicine", name:"Addiction Medicine"});
        // Specialties.insert({value:"Addiction Psychiatry", name:"Addiction Psychiatry"});
        // Specialties.insert({value:"Adolescent Medicine", name:"Adolescent Medicine"});
        // Specialties.insert({value:"Adult Orthopedic Surgery", name:"Adult Orthopedic Surgery"});
        // Specialties.insert({value:"Aerospace Medicine", name:"Aerospace Medicine"});
        // Specialties.insert({value:"Allergy", name:"Allergy"});
        // Specialties.insert({value:"Allergy & Immunology", name:"Allergy & Immunology"});
        // Specialties.insert({value:"Anatomic Pathology", name:"Anatomic Pathology"});
        // Specialties.insert({value:"Anatomic/Clinical Pathology", name:"Anatomic/Clinical Pathology"});
        // Specialties.insert({value:"Anesthesiology", name:"Anesthesiology"});
        // Specialties.insert({value:"Bariatrician", name:"Bariatrician"});
        // Specialties.insert({value:"Blood Banking", name:"Blood Banking"});
        // Specialties.insert({value:"Cardiac Electrophysiology", name:"Cardiac Electrophysiology"});
        // Specialties.insert({value:"Cardiovascular Disease", name:"Cardiovascular Disease"});
        // Specialties.insert({value:"Cardiovascular Surgery", name:"Cardiovascular Surgery"});
        // Specialties.insert({value:"Chemical Pathology", name:"Chemical Pathology"});
        // Specialties.insert({value:"Clinical Genetics", name:"Clinical Genetics"});
        // Specialties.insert({value:"Clinical Neurophysiology", name:"Clinical Neurophysiology"});
        // Specialties.insert({value:"Clinical Pathology", name:"Clinical Pathology"});
        // Specialties.insert({value:"Clinical Pharmacology", name:"Clinical Pharmacology"});
        // Specialties.insert({value:"Colon & Rectal Surgery", name:"Colon & Rectal Surgery"});
        // Specialties.insert({value:"Critical Care Anesthesiology", name:"Critical Care Anesthesiology"});
        // Specialties.insert({value:"24", name:"Critical Care Medicine"});
        // Specialties.insert({value:"Critical Care Medicine", name:"Critical Care Surgery"});
        // Specialties.insert({value:"Cytopathology", name:"Cytopathology"});
        // Specialties.insert({value:"Dental Endodontics", name:"Dental Endodontics"});
        // Specialties.insert({value:"Dental General Practice", name:"Dental General Practice"});
        // Specialties.insert({value:"Dental Oral & Maxillofacial Surgery", name:"Dental Oral & Maxillofacial Surgery"});
        // Specialties.insert({value:"Dental Oral Pathology", name:"Dental Oral Pathology"});
        // Specialties.insert({value:"Dental Orthodontics", name:"Dental Orthodontics"});
        // Specialties.insert({value:"Dental Pediatrics", name:"Dental Pediatrics"});
        // Specialties.insert({value:"Dental Periodontics", name:"Dental Periodontics"});
        // Specialties.insert({value:"Dental Prosthodontics", name:"Dental Prosthodontics"});
        // Specialties.insert({value:"Dental Public Health", name:"Dental Public Health"});
        // Specialties.insert({value:"Dermatologic Surgery", name:"Dermatologic Surgery"});
        // Specialties.insert({value:"Dermatology", name:"Dermatology"});
        // Specialties.insert({value:"Dermatopathology", name:"Dermatopathology"});
        // Specialties.insert({value:"Developmental Behavioral Pediatrics", name:"Developmental Behavioral Pediatrics"});
        // Specialties.insert({value:"Diabetes", name:"Diabetes"});
        // Specialties.insert({value:"Diagnostic Radiology", name:"Diagnostic Radiology"});
        // Specialties.insert({value:"Emergency Medicine", name:"Emergency Medicine"});
        // Specialties.insert({value:"Endocrinology", name:"Endocrinology"});
        // Specialties.insert({value:"Family Practice", name:"Family Practice"});
        // Specialties.insert({value:"Flexible", name:"Flexible"});
        // Specialties.insert({value:"Foot & Ankle Orthopedics", name:"Foot & Ankle Orthopedics"});
        // Specialties.insert({value:"Forensic Pathology", name:"Forensic Pathology"});
        // Specialties.insert({value:"Forensic Psychiatry", name:"Forensic Psychiatry"});
        // Specialties.insert({value:"Gastroenterology", name:"Gastroenterology"});
        // Specialties.insert({value:"General Practice", name:"General Practice"});
        // Specialties.insert({value:"General Preventive Medicine", name:"General Preventive Medicine"});
        // Specialties.insert({value:"General Surgery", name:"General Surgery"});
        // Specialties.insert({value:"Genetics", name:"Genetics"});
        // Specialties.insert({value:"Geriatric Psychiatry", name:"Geriatric Psychiatry"});
        // Specialties.insert({value:"Geriatrics", name:"Geriatrics"});
        // Specialties.insert({value:"Geriatrics Family Practice", name:"Geriatrics Family Practice"});
        // Specialties.insert({value:"Gynecological Oncology", name:"Gynecological Oncology"});
        // Specialties.insert({value:"Gynecology", name:"Gynecology"});
        // Specialties.insert({value:"Hand Surgery", name:"Hand Surgery"});
        // Specialties.insert({value:"Head & Neck Surgery", name:"Head & Neck Surgery"});
        // Specialties.insert({value:"Hematology", name:"Hematology"});
        // Specialties.insert({value:"Hematology Oncology", name:"Hematology Oncology"});
        // Specialties.insert({value:"Hepatology", name:"Hepatology"});
        // Specialties.insert({value:"Hospitalist", name:"Hospitalist"});
        // Specialties.insert({value:"Immunology", name:"Immunology"});
        // Specialties.insert({value:"Immunology, Diagnostic Laboratory", name:"Immunology, Diagnostic Laboratory"});
        // Specialties.insert({value:"Immunopathology", name:"Immunopathology"});
        // Specialties.insert({value:"Infectious Diseases", name:"Infectious Diseases"});
        // Specialties.insert({value:"Internal Medicine", name:"Internal Medicine"});
        // Specialties.insert({value:"Interventional Cardiology", name:"Interventional Cardiology"});
        // Specialties.insert({value:"Legal Medicine", name:"Legal Medicine"});
        // Specialties.insert({value:"Maternal & Fetal Medicine", name:"Maternal & Fetal Medicine"});
        // Specialties.insert({value:"Maxillofacial Surgery", name:"Maxillofacial Surgery"});
        // Specialties.insert({value:"Medical Microbiology", name:"Medical Microbiology"});
        // Specialties.insert({value:"Medical Oncology", name:"Medical Oncology"});
        // Specialties.insert({value:"Medical Toxicology", name:"Medical Toxicology"});
        // Specialties.insert({value:"Neonatal Perinatal Medicine", name:"Neonatal Perinatal Medicine"});
        // Specialties.insert({value:"Nephrology", name:"Nephrology"});
        // Specialties.insert({value:"Neuro Radiology", name:"Neuro Radiology"});
        // Specialties.insert({value:"Neurological Surgery", name:"Neurological Surgery"});
        // Specialties.insert({value:"Neurological Surgery, Critical Care", name:"Neurological Surgery, Critical Care"});
        // Specialties.insert({value:"Neurology", name:"Neurology"});
        // Specialties.insert({value:"Neuropathology", name:"Neuropathology"});
        // Specialties.insert({value:"Nuclear Medicine", name:"Nuclear Medicine"});
        // Specialties.insert({value:"Nuclear Radiology", name:"Nuclear Radiology"});
        // Specialties.insert({value:"Nutrition", name:"Nutrition"});
        // Specialties.insert({value:"Obstetrics", name:"Obstetrics"});
        // Specialties.insert({value:"Obstetrics & Gynecology", name:"Obstetrics & Gynecology"});
        // Specialties.insert({value:"Obstetrics & Gynecology/Critical Care", name:"Obstetrics & Gynecology/Critical Care"});
        // Specialties.insert({value:"Occupational Medicine", name:"Occupational Medicine"});
        // Specialties.insert({value:"Ophthalmology", name:"Ophthalmology"});
        // Specialties.insert({value:"Orthopedic Surgery", name:"Orthopedic Surgery"});
        // Specialties.insert({value:"Orthopedic Surgery Of The Spine", name:"Orthopedic Surgery Of The Spine"});
        // Specialties.insert({value:"Orthopedic Surgery, Sports Med", name:"Orthopedic Surgery, Sports Med"});
        // Specialties.insert({value:"Orthopedic Trauma Surgery", name:"Orthopedic Trauma Surgery"});
        // Specialties.insert({value:"Orthopedic, Musculoskeletal", name:"Orthopedic, Musculoskeletal"});
        // Specialties.insert({value:"Osteopathic Manipulative Medicine", name:"Osteopathic Manipulative Medicine"});
        // Specialties.insert({value:"Other Specialty", name:"Other Specialty"});
        // Specialties.insert({value:"Otology", name:"Otology"});
        // Specialties.insert({value:"Otorhinolaryngology", name:"Otorhinolaryngology"});
        // Specialties.insert({value:"Pain Management", name:"Pain Management"});
        // Specialties.insert({value:"Pain Medicine", name:"Pain Medicine"});
        // Specialties.insert({value:"Palliative Medicine", name:"Palliative Medicine"});
        // Specialties.insert({value:"Pathology", name:"Pathology"});
        // Specialties.insert({value:"Pathology, Hematology", name:"Pathology, Hematology"});
        // Specialties.insert({value:"Pediatric Allergy", name:"Pediatric Allergy"});
        // Specialties.insert({value:"Pediatric Anesthesiology", name:"Pediatric Anesthesiology"});
        // Specialties.insert({value:"Pediatric Cardiology", name:"Pediatric Cardiology"});
        // Specialties.insert({value:"Pediatric Critical Care", name:"Pediatric Critical Care"});
        // Specialties.insert({value:"Pediatric Emergency Medicine", name:"Pediatric Emergency Medicine"});
        // Specialties.insert({value:"Pediatric Endocrinology", name:"Pediatric Endocrinology"});
        // Specialties.insert({value:"Pediatric Gastroenterology", name:"Pediatric Gastroenterology"});
        // Specialties.insert({value:"Pediatric Hematology Oncology", name:"Pediatric Hematology Oncology"});
        // Specialties.insert({value:"Pediatric Infectious Diseases", name:"Pediatric Infectious Diseases"});
        // Specialties.insert({value:"Pediatric Internal Medicine", name:"Pediatric Internal Medicine"});
        // Specialties.insert({value:"Pediatric Nephrology", name:"Pediatric Nephrology"});
        // Specialties.insert({value:"Pediatric Neurology", name:"Pediatric Neurology"});
        // Specialties.insert({value:"Pediatric Ophthalmology", name:"Pediatric Ophthalmology"});
        // Specialties.insert({value:"Pediatric Orthopedic Surgery", name:"Pediatric Orthopedic Surgery"});
        // Specialties.insert({value:"Pediatric Otolaryngology", name:"Pediatric Otolaryngology"});
        // Specialties.insert({value:"Pediatric Pathology", name:"Pediatric Pathology"});
        // Specialties.insert({value:"Pediatric Psychiatry", name:"Pediatric Psychiatry"});
        // Specialties.insert({value:"Pediatric Pulmonology", name:"Pediatric Pulmonology"});
        // Specialties.insert({value:"Pediatric Radiology", name:"Pediatric Radiology"});
        // Specialties.insert({value:"Pediatric Rheumatology", name:"Pediatric Rheumatology"});
        // Specialties.insert({value:"Pediatric Sports Medicine", name:"Pediatric Sports Medicine"});
        // Specialties.insert({value:"Pediatric Surgery", name:"Pediatric Surgery"});
        // Specialties.insert({value:"Pediatric Urology", name:"Pediatric Urology"});
        // Specialties.insert({value:"Pediatrics", name:"Pediatrics"});
        // Specialties.insert({value:"Perinatal Medicine", name:"Perinatal Medicine"});
        // Specialties.insert({value:"Pharmaceutical Medicine", name:"Pharmaceutical Medicine"});
        // Specialties.insert({value:"Phlebology", name:"Phlebology"});
        // Specialties.insert({value:"Physical Medicine/Rehabilitation", name:"Physical Medicine/Rehabilitation"});
        // Specialties.insert({value:"Plastic Surgery", name:"Plastic Surgery"});
        // Specialties.insert({value:"Plastic Surgery, Hand Surgery", name:"Plastic Surgery, Hand Surgery"});
        // Specialties.insert({value:"Psychiatry", name:"Psychiatry"});
        // Specialties.insert({value:"Psychoanalysis", name:"Psychoanalysis"});
        // Specialties.insert({value:"Public Health", name:"Public Health"});
        // Specialties.insert({value:"Pulmonary Critical Care Medicine", name:"Pulmonary Critical Care Medicine"});
        // Specialties.insert({value:"Pulmonary Disease", name:"Pulmonary Disease"});
        // Specialties.insert({value:"Radiation Oncology", name:"Radiation Oncology"});
        // Specialties.insert({value:"Radioisotopic Pathology", name:"Radioisotopic Pathology"});
        // Specialties.insert({value:"Radiology", name:"Radiology"});
        // Specialties.insert({value:"Reproductive Endocrinology", name:"Reproductive Endocrinology"});
        // Specialties.insert({value:"Rheumatology", name:"Rheumatology"});
        // Specialties.insert({value:"Spinal Cord Injury", name:"Spinal Cord Injury"});
        // Specialties.insert({value:"Sports Medicine", name:"Sports Medicine"});
        // Specialties.insert({value:"Surgical Oncology", name:"Surgical Oncology"});
        // Specialties.insert({value:"Thoracic Surgery", name:"Thoracic Surgery"});
        // Specialties.insert({value:"Traumatic Surgery", name:"Traumatic Surgery"});
        // Specialties.insert({value:"Undersea Medicine", name:"Undersea Medicine"});
        // Specialties.insert({value:"Unspecified", name:"Unspecified"});
        // Specialties.insert({value:"Urgent Care", name:"Urgent Care"});
        // Specialties.insert({value:"Urological Surgery", name:"Urological Surgery"});
        // Specialties.insert({value:"Vascular Interventional Radiology", name:"Vascular Interventional Radiology"});
        // Specialties.insert({value:"Vascular Surgery", name:"Vascular Surgery"});
    }
});
