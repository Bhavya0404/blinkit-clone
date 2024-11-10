export async function GET(request: Request) {
    let data = await fetch(`https://api.mapbox.com/search/searchbox/v1/retrieve/dXJuOm1ieHBvaTpiMGY1Y2E5NC01NmUyLTRiNzMtODIwZi0xODI2NTBiZTI1NDk?access_token=pk.eyJ1Ijoic2VhcmNoLW1hY2hpbmUtdXNlci0xIiwiYSI6ImNrNnJ6bDdzdzA5cnAza3F4aTVwcWxqdWEifQ.RFF7CVFKrUsZVrJsFzhRvQ&session_token=097f53cc-b1f4-40ad-947b-aad2378d6490`);
    const res = await data.json();
    console.log(data);
}