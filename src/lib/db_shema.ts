import mongoose from 'mongoose';
const { Schema } = mongoose;

const TempEventSchema = new Schema({
  
})

const EventSchema = new Schema({

})


export const TmepEventMongoseeModle = mongoose.model('TempEventSchema', TempEventSchema)
export const EventMongoseeModle = mongoose.model('EventSchema', EventSchema)

const conecction = mongoose.connect('mongodb://127.0.0.1:27017/myapp');


export function disconnectFromDb  (connection :Promise<typeof mongoose>){
            conecction.then((conecction)=>{   
                  if(conecction.STATES.connected){
                    conecction.disconnect()
                }
                
})

}

