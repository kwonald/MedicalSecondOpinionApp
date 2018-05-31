Template.doctor_register.helpers({
	'specialty':function(){
		return ['Diagnostic Radiology','Muscle & Reflex','Neurological Surgery', 'Ophthalmology'];
	},

	'sub_specialty':function(){
		return findSub(Template.instance().subspecialty.get());
	}
});

Template.doctor_register.events({
	'change [name = doctor_specialty]':function(event){
		event.preventDefault();
		Template.instance().subspecialty.set(event.target.value);
	}
});

Template.doctor_register.onCreated(function(){
	this.subspecialty = new ReactiveVar();
});

function findSub(query){
	var specialties = [{specialty:'Diagnostic Radiology',subspecialty:'Brain Scan'},{specialty:"Muscle & Reflex", subspecialty:'Shoulder Therapy'},
							{specialty:'Neurological Surgery', subspecialty:'Spine Surgeon'},{specialty:'Neurological Surgery',subspecialty:"Neck Cracker"},
							{specialty:"Ophthalmology", subspecialty:"Joint Muscle Test"}];
	var temp = [];
	specialties.forEach(function(r){
		if(r.specialty== query){
			temp.push(r);
		}
	});
	return temp;
}