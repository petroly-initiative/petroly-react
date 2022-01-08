
const arabic = {
    newsHeader: "اخبار بترولي",
    servicesHeader: "خدماتنا",
    news0: {
        title: "بترولي بحلة جديدة!",
        content: "مبادرة بترولي تعود من جديد بتصميم جديد لأحبائنا البتروليين. وخدمة المجتمعات الجديدة", 
    },
    news1: {
        title: "التقييم صار أسهل",
        content: "تقييم المحاضرين أصبح أبسط من أي وقت مضى. بواجهة جديدة كليا وتجربة مستخدم مريحة للجميع", 
    
    },
    news2: {
        title: "البتروليين صاروا أقرب!",
        content: "خدمة المدتمعات الجديدة تسمح لك بالبحث عن زملاءك البتروليين ذوي الاهتمامات المشتركة", 
   
    },
    service0: "المجتمعات",
    service1: "التقييم"
    }

const english = {
  newsHeader: "Petroly News",
  servicesHeader: "Our Services",
  news0: {
    title: "Petroly is Back and better than ever!",
    content: `The Petroly Intiative is back with new user interface, easier user experience
    , and new Groups Service!`,
  },
  news1: {
    title: "Evaluation Revamp",
    content: "Evaluating your instructors is easier than ever! Take a look",
    
  },
  news2: {
    title: "Your mates are now closer",
    content:
      "Our new Groups Service helps you find other KFUPMers with similar hobbies",
  
  },
  newsRedirect: "Visit the service",
  service0: "Groups",
  service1: "Evaluation",
};

export default function  translator(lang){
    switch((lang)){
        case "ar":
            return arabic;
        case "en":
            return english;
        default:
          return lang;
    }
} 