const Flight = require('./models/Flight');
const resolvers = {
    Query: {
        flights: async (_, args) => {
            const filter = {};
            if (args.from) filter.from = args.from;
            if (args.to) filter.to = args.to;
            const flights = await Flight.find(filter);
            return flights.map(f => ({ ...f._doc, id: f._id }));
        },
flight: async (_, { id }) => {
            const f = await Flight.findById(id);
            return f ? { ...f._doc, id: f._id } : null;
        }
    },
    Mutation: {
        addFlight: async (_, { from, to, airline, price, departureTime }) => {
            const newFlight = new Flight({
                from, to, airline, price,
                departureTime
            });
            const saved = await newFlight.save();
            return { ...saved._doc, id: saved._id };
        },
        deleteFlight: async (_, { id }) => {
            const deleted = await Flight.findByIdAndDelete(id);
            return deleted ? { ...deleted._doc, id: deleted._id } : null;
        }
    }
};
module.exports = resolvers;