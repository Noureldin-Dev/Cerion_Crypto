import { Flex } from "@chakra-ui/react"



async function getTickets(){
  let data = await fetch('http://worldtimeapi.org/api/timezone/Etc/UTC',{
    next:{
        revalidate:3600
    }
});

return await data.json()
}
 
export default async function Page() {
  let data = await getTickets()
  let posts = data
  return (
    <Flex
    justify="center"
    align="flex-start"
    minHeight="100%"
    width="80%"
    pt="20px"
  >
      <h1>Blog Posts</h1>
      <ul>
        {/* {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))} */}
        {data.datetime}
      </ul>
      </Flex>
  )
}
