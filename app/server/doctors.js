Meteor.methods({
    'doctors.getPrice': function(start, end, date, doctor_id) {
        let startDate = new Date(start+' '+ date);
        let endDate = new Date(end+ ' ' + date);

        let doc = Doctors.findOne({doctor_id: doctor_id});
        if(!doc){
            throw new Error("doctor not found");
        }
        let foundSchedule = null;
        doc.time.forEach(function(t){
            let t_start = moment(t.start).toDate();
            let t_end =  moment(t.end).toDate();
            if(startDate >= t_start &&
               endDate >= t_start &&
               startDate <= t_end &&
               endDate <= t_end) {
                foundSchedule = t;

            }
        });

        if(foundSchedule==null){
            throw new Error("no schedule matches");
        }

        var rate = parseFloat(foundSchedule.price);
        var diffHours = (endDate-startDate)%86400000/3600000;
        var price =  diffHours * rate;
        // var pemail = Meteor.users.findOne({_id: doctor_id}).paypalemail;
        // if(!pemail)
        //     throw new Error('doctor dose not have paypal email');

        return {
            amount: price,
        }
    }
})