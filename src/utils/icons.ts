const generateAvatarUrl = (path: string) => {
  const baseUrl = 'http://message-list.appspot.com'
 return baseUrl+path
}

export { generateAvatarUrl }