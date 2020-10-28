const feed = (parent,args,context,info) => context.prisma.link.findMany()

const postedBy = (parent,args,context,info) => {
    return context.prisma.link.findOne({where: {id:parent.id}}).postedBy()
}
const votes = (parent,args,context,info) => {
    return context.prisma.link.findOne({where:{id:parent.id}}).votes()
}

module.exports = {
    postedBy,
    votes
}