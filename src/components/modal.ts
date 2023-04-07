interface Props {

  tracks:{
    artists: any;
    duration: any
    title: any;
    albumImage: string | undefined;
    uri:string
 
    album: {
      images: {
        url:string
      }[];
       name: string;
       
    };
      
      duration_ms: any;
      release_date: string;
      name:string;
      id: string;
      slideRight:boolean;
  }

}





  export default Props


 /* tracks:{
    uri:string
 
    album: {
      images: {
        url:string
      }[];
       name: string;
       
    };
      artists: {
        name: string;
        id: string;
      }[]
      duration_ms: any;
      release_date: string;
      name:string;
      id: string;
      slideRight:boolean;
  } */