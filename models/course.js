const {Schema,model}=require("mongoose");

const courseSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    duration:{
        type:String
    },
    thumbnail:{
        type:String
    }
},{timestamps:true});

const Course=model('course',courseSchema);
Course.deleteMany({})
  .then(() => {
    console.log('All courses removed from collection.');
  })
  .catch((error) => {
    console.error('Error removing courses:', error);
  });
  const courses=
    [
        { title: '(New) Responsive Web Design Certification', duration: '(300 hours)',thumbnail:'images/course1_2.svg' },
        { title: 'Legacy Responsive Web Design', duration: '(300 hours)',thumbnail:'images/course1_2.svg' },
        { title: 'JavaScript Algorithms and Data Structures', duration: '(300 hours)',thumbnail:'images/js.svg' },
        { title: 'Front End Development Libraries', duration: '(300 hours)',thumbnail:'images/frontend.svg' },
        { title: 'Data Visualization', duration: '300 hours)',thumbnail:'images/data_visualize.svg' },
        { title: 'Back End Development and APIs', duration: '(300 hours)',thumbnail:'images/backend.svg' },
        { title: 'Quality Assurance', duration: '(300 hours)',thumbnail:'images/quality_assurance.svg' },

      ];
      Course.insertMany(courses)
  .then(() => {
    console.log('Mock data saved successfully!');
  })
  .catch((error) => {
    console.error('Error saving mock data:', error);
  });


module.exports=Course;