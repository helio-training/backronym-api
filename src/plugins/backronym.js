import Joi from 'joi';
import Backronym from 'backronym';
import { collection } from '../db';

const plugin = (server, options, next) => {
  
  server.route({
    method: "GET",
    path: "/v1/create/{acronym}",
    config: {
      tags: ["api", "v1"],
      validate: {
        params: {
          acronym: Joi.string().required()
        }
      }
    },
    handler: {
      async: async(request, reply) => {
        const words = await collection('words');
        
        const cursor = await words.find({});
        const result = await cursor.toArray();
        
        const acronym = request.params.acronym;
        const backronym = Backronym.create(acronym);
        return reply({ backronym, result });
      }
    }
  });
  
  console.log('Backronym plugin was loaded');
  
  return next();
};

plugin.attributes = {
  name: 'backronym',
  version: '1.0.0'
};

export default plugin;
