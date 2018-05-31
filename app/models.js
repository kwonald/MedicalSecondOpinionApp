Patients = new Mongo.Collection('patients');

/* patients collection
 * {
 *  patient_id
 *  patient_firstname
 *  patient_lastname
 *  patient_email
 *  patient_phone
 * }
 */

Doctors = new Mongo.Collection('doctors');

/* doctors collection
 * {
 	doctor_id,
 	profile{
	
 	},
 	time[{
 		id,
		title,
		start,
		end,
		start_sec,
		end_sec,
		price
 	}],
 	events[{
		title(string),
		start(ISO),
		end(ISO),
		allDay(boolean)
 	}]
 * }
 */


 Requests = new Mongo.Collection('request');

 /*
 {
	from,
	to,
	type,
	date,
	time,
	status(string)
 }
 */

Specialties = new Mongo.Collection('specialties');

SubSpecialties = new Mongo.Collection('subspecialties');


if(Meteor.isServer){
	if(Specialties.find().count() == 0){
	Meteor.call('populate');
	}
}

