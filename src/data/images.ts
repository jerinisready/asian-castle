import type { ImageAsset } from './types'

/*
 * Imagery from the approved Stitch design (stitch/code.html).
 * These are generated stand-ins hosted by Google (lh3.googleusercontent.com/aida-public)
 * and can expire. Replace each with real Asian Castle photography before launch.
 */
const stitch = (id: string) => `https://lh3.googleusercontent.com/aida-public/${id}`

export const images = {
  logo: {
    src: stitch(
      'AB6AXuApBzzBQPYgQLx_tpN6IQYmjWlAV8rsMZJCyg6JArqIi2r-31y_XFGGUGJcXnkKkZtpOwRGY0zG_CZU8sq9HUjdqJ5S38KBYdHqNoM5sC_7TtpoWiXNU7d_U3nZlaRX0Ba7e6srKsHKKUkZa3_4GfN8eGSQkIgH_Gx19Yhs6uIkM8m8KvCz7wlHi_CDZJZudN7VpdwZJkPLxYQckn9xRxuEDsvp5Ujr2lyrwCZ7XcEr',
    ),
    alt: 'Asian Castle Restaurant Logo',
    placeholder: true,
  },
  diningSanctuary: {
    src: stitch(
      'AB6AXuCD9sR-9DKcPPpO7dGTmc0h0Sb5XAjWAsS-RUSyIlluk_YrPzAc8dTTeyeAbMJXd36DOqjAg7YzWQFszoW_tcWH96f_ffVQLtvZei1qZyPfxCrheu4Y9l31QhUwerAdz5vnLVdO0suqS1boqbCtO3-vypJ4cqlO57Y_3hjzOnGNYcahRioyiPjUpSY1bDBUy2w63TTdLjfLlVmn53hlDMu0RrJviRE2a1nLx9ZSHGKt',
    ),
    alt: 'Dimly lit dining room with carved wooden archways, hanging brass lanterns and warm amber light',
    placeholder: true,
  },
  dumBiryani: {
    src: stitch(
      'AB6AXuBj5sv_b9Bg35vsRh8geSUemaS2s1sjT-fjLGOPUOxp6s8pCl5sPQPzXe1IsQy3e6iHw-91fb2DhKTEeoMpBbQ1byOR4EsOEX4cu0cH1sTvg8BoHucUag4LXb9DJcPAJwfK9PMZ6QzOY2ad9JJ5IYBNBA3TMTd1tF0Dn9Z5CUxh5I-_Mfr2yCCKGBcPRuh7sxd8mRdDkfhkHnil6CdLEg-KEb-SbA-dTkexWvGwqgGK',
    ),
    alt: 'Copper uruli of steaming Malabar dum biryani with fried onions, mint and cashews on a banana leaf',
    placeholder: true,
  },
  beefDryFry: {
    src: stitch(
      'AB6AXuD_iNBzTWaZscA5iUd0QD9Y0_AjgAomA3T8sp7Fq_j7o5LtnQzHEWPsm9rah69l80EyPmykHRRWZwuGOtx_4b5wD8-HTHaT-jBxsPak4OyhYd6sFz4WF4bUo3INBdQ1a5X3ExhA9sxfnMc533XLF5BSggwOjhyNhpjBUt8DHQZeDaAqso_4wlwVwx64tHp_pSPcAunOeH2-pLwJ0wz3RxaX3rKBZw5DF9fIS5tlVU-c',
    ),
    alt: 'Kerala beef dry fry with browned coconut slivers, curry leaves and shallots in a bronze bowl',
    placeholder: true,
  },
  karimeen: {
    src: stitch(
      'AB6AXuD6kJwr-qKMbqMPYlgsfpAs3rHpCgzyDIkQBxFqmtycUc0qAEBjW61NKm7RsnEWuxbgEWGtVyfWPXj4BSDdqyxJeilerPmCmQhvryaLmZYxWiah_mqUGcHlPb8EwmJ6absTNw2mlImKviJuanDuL8e3LJFQ7i_Y3vUZ257gONJeaGUUl6Nl9kLyq1nlqdL7d6uDlU9cgLptLoE23vWVGEziB-QPngn6b8Flgv9rUHnS',
    ),
    alt: 'Karimeen pollichathu: pearl spot fish in shallot masala wrapped in charred banana leaf',
    placeholder: true,
  },
  charcoalMandi: {
    src: stitch(
      'AB6AXuBJT7siQYSTgFWLYqoN3MjwHLqMGa2HZ2Oj1Irhzz61TPolTKjqEcfLCfPC_7mKP5dVNG9fqlWN-jzyzE57pWgChBfu96UzQB_zrI9s8O6C2wkMpGIdgZCn5RIgqzm17heXLphkbvC0a2pHQwGLv2oTrJ-Yh9SGsY-ikVkgHBhrWZpGd4rv42cxVEumX8GvwoOlj90s052RAHGUoVS-dgIngo6yxZsu79zgFvuNH9k6',
    ),
    alt: 'Charcoal-grilled chicken mandi on long-grain rice with almonds, sultanas and daqoos',
    placeholder: true,
  },
  clayTikka: {
    src: stitch(
      'AB6AXuC_eTEOrNqm3UXWTe0yQvEfQpW53tetjzesrWAuCE7RQN6fleQLC0rQt7ggXCn8VhU1wTTtYcz8GskKj-BootmyuRNu-_jgV3SPo0IOwYHHEGI6W95K6M06UtPRojRoxsVjkdSwjzBukTMqG2aOHAXOg8YWQk_m-HwZqaEDdrO_5jiio1KE_-FAynhKAAYmdTQJEy58R5FNzcW8eJW5ZEIWBTWIEM8ka2ukJSbfw1lw',
    ),
    alt: 'Tandoor chicken tikka skewers with charred edges, coriander, lime and mint chutney',
    placeholder: true,
  },
  appamStew: {
    src: stitch(
      'AB6AXuB5c-DUuxoEzmQaBS9FXszyWc_z_EKukXFv6znA3bR8Df5Xh2nSdZ4jX-s8ltMq-SDjhDHC9oLh5oq0DFJNm6iX_ffHpMGRyJuivkXVFZCEWY1FhTcU0Ee4IDIfuwp0u7ms4LNdtDBZXOLvPSoD8j55sOH7m2rKVRMlsjr_u567v6UbRZwdfG3tZ5Ooev6XS0Xgzfbithtd-yx6dy0aswzaMCdBYMKzaerr8kXuqAXO',
    ),
    alt: 'Lacy appams beside a coconut milk vegetable stew with curry leaves',
    placeholder: true,
  },
  chiliChicken: {
    src: stitch(
      'AB6AXuBU8g6ydLpckeaXsO81SZ19Vcg41v2YaOWeds4Gz-9_UbU7WyWCV0ZL9JehqSvLsg7-oaAUpLSkvwtsVYt78-qg2OlDW6-tVT_AMnWMZnO0E_4HW_Hv3l0KHBT0wQjDuBEwfnSlV49Nl4sQykwFUK3zXHQPKgxTqZwIV4cRn_KgM2CtMWlrLOTXgxpXpJPDtnfGPiDEGQr7_XRw80z9P9RNGwOHfQGZ-JMDQVZColeX',
    ),
    alt: 'Wok-tossed chili chicken with scallions, peppers and red chili glaze in a cast-iron skillet',
    placeholder: true,
  },
  hummus: {
    src: stitch(
      'AB6AXuAq3t1PRJLywyBRdF2QPURtgP18BrXt-_C5pLCzYbFy0pD3uaDoO0hiEeSeoV2_d6k0ILaREpl3EymIioAJRRwyd6x04Mpz6sZ36TC6pqLYJz6neVXV8UgbMp-GXufPFRz906nwcJHlk_HqCmmyDTbzQUpq82BVSOg_ftrHhxQhPy7tMmWebTYj_vuvXWNcedbLwgop3IoHZCB5MNSt9B8YPzEa6IBcu2fY8Hwj9XpL',
    ),
    alt: 'Hummus drizzled with olive oil, whole chickpeas and pine nuts beside warm pita',
    placeholder: true,
  },
  grillPlatter: {
    src: stitch(
      'AB6AXuBAU4RlEB_pV_xfS4jw_v7CRY6bYWdKXVne5UWXFHNDHo7xAHtzlOl9CJqzOUrUCDXDtxtyy38WXkk-X3ot_4xEEmpJaDOtLtCG5iY--utzdJNHveRjgrvt-Rl73JfvvhM5w3vEt15amaO7k5Kfypkn_RZJF9fplnJnZLIyY2mM-vPRCnnMFpDt6c1AzW1dkN-X5QrHPQ_it89Ai_M_FP3u33bDRA1ZefS46cqX8gz0',
    ),
    alt: 'Mixed grill platter of seekh kebabs, reshmi tikka and mutton chops on a wooden board',
    placeholder: true,
  },
  instagramQr: {
    src: 'https://lh3.googleusercontent.com/aida/ALJJyrDKzCv9mAvDXnBx9PIlueA8pcFLaXMSvjJ9XySmTz7QuRFW0FkZQBBLp3wURFcjIw27zw2cSdu80k_75Tgzc4hOqhJkz4Y84X6bQwwoOIYl76PuvgzRHWKr00FgbQboSlzOtXwld5eFGmWj2LQ_0TOyEQEL2SusgPDTG_FMNhO2vwEOXew6Lzdi6cdbyU7LDhEJyTeT3x07MTmO11Yojbf9btZeVBAcyb_z6Ixt5KL4gA',
    alt: 'Instagram QR Code',
    placeholder: true,
  },
} satisfies Record<string, ImageAsset>
