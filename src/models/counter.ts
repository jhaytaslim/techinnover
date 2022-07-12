import mongoose from 'mongoose'
const counterSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true
    },
    sequence_value: {
      type: Number,
      required: true,
      default: 0
    }
  },
  {
    timestamps: false
  }
)

// counterSchema.statics.getNextSequenceValue = function (sequenceName, value = 1) {
//     var sequenceDocument = this.collection.findAndModify({
//         query:{_id: sequenceName },
//         update: {$inc:{sequence_value: value}},
//         new:true
//      });
//      console.log("sequence document: ", sequenceDocument)
//      return sequenceDocument.sequence_value;
  
//      //return this.collection.findAndModify(query, sort, doc, options, callback)
// }

// counterSchema.statics.getNextSequenceValue = function (
//   query,
//   sort,
//   doc,
//   options,
//   callback
// ) {
//   return this.collection.findAndModify(query, sort, doc, options, callback)
// }

const Counter = mongoose.model('Counters', counterSchema)

export default Counter
