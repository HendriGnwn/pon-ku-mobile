import React, { Component } from 'react';
import { FlatList, TouchableOpacity, View, StyleSheet, TouchableNativeFeedback, ActivityIndicator, Alert, RefreshControl, BackHandler, Vibration, ScrollView } from 'react-native';
import { Card, Text, Button, Overlay } from 'react-native-elements';
import { Global } from './../helpers/Global';
import { Actions } from 'react-native-router-flux';
import RNShakeEvent from 'react-native-shake-event';

const data = [
  {
    name: 'Discount 50% Starbucks',
    file: 'https://i2.wp.com/www.morepromo.info/wp-content/uploads/2016/01/12489397_10156355781425333_2648707575936813409_o.png',
    short_description: 'diskon 50%, Maksimum diskon Rp. 300.000',
    description: 'Promo hanya berlaku tanggal 26 - 29 Juni 2018 pukul 00.00-23.59 WIB.' +
      'Harga produk yang tertera pada website BELUM termasuk Ekstra Diskon. ' +
      'Untuk mendapatkan Ekstra Diskon, masukkan kode voucher pada halaman Pengiriman & Pembayaran. ' +
      '1 user ID dapat menggunakan masing-masing kode voucher dengan jumlah maksimum 1x/transaksi. ' +
      '1 user ID hanya dapat melakukan 1x transaksi dengan jumlah maksimum 3 pcs untuk setiap SKU produk. Pembelian yang melebihi ketentuan menggunakan alamat email dan/atau alamat pengiriman yang sama tidak diperbolehkan ' +
      '1 kode voucher hanya dapat digunakan 1x dan berlaku untuk 1 nomor credit card dan atau 1 member yang telah melakukan verifikasi nomor handphone.  ' +
      'Promo Big PayDay tidak dapat digabungkan dengan promo lainnya, termasuk promo pembelian Blibli Gift Card, pembelian Blibli Pulsa, dan penggunaan Coupon & Voucher Blibli.com. ' +
      'Blibli.com berhak secara sepihak membatalkan pesanan dan/atau menonaktifkan voucher apabila tidak sesuai dengan syarat & ketentuan berlaku dan/atau ditemukan adanya indikasi kecurangan/pelanggaran yang merugikan pihak Blibli.com.',
    term_condition : 'Ekstra diskon 15%, maks. diskon Rp 300.000 berlaku untuk 1000 transaksi pertama (quota diisi secara berkala) khusus kategori  Otomotif, dan Tiket & Voucher (selain voucher belanja fisik) dengan menginput kode voucher "BONUSAN-15" pada saat check out.',
    start_date : '2018-06-26',
    end_date : '2018-06-29',
  },
  {
    name: 'Discount 50% Pizza Hut',
    file: 'http://1.bp.blogspot.com/-8Q-fNvwmGTk/T9iQKL3APgI/AAAAAAAABD0/Irn7tnATlTE/s1600/pizza+hut+50%25+off+cheesy+bites+steak+pizza.jpg',
    short_description: 'diskon 50%, Maksimum diskon Rp. 300.000',
    description: 'Promo hanya berlaku tanggal 26 - 29 Juni 2018 pukul 00.00-23.59 WIB.' +
      'Harga produk yang tertera pada website BELUM termasuk Ekstra Diskon. ' +
      'Untuk mendapatkan Ekstra Diskon, masukkan kode voucher pada halaman Pengiriman & Pembayaran. ' +
      '1 user ID dapat menggunakan masing-masing kode voucher dengan jumlah maksimum 1x/transaksi. ' +
      '1 user ID hanya dapat melakukan 1x transaksi dengan jumlah maksimum 3 pcs untuk setiap SKU produk. Pembelian yang melebihi ketentuan menggunakan alamat email dan/atau alamat pengiriman yang sama tidak diperbolehkan ' +
      '1 kode voucher hanya dapat digunakan 1x dan berlaku untuk 1 nomor credit card dan atau 1 member yang telah melakukan verifikasi nomor handphone.  ' +
      'Promo Big PayDay tidak dapat digabungkan dengan promo lainnya, termasuk promo pembelian Blibli Gift Card, pembelian Blibli Pulsa, dan penggunaan Coupon & Voucher Blibli.com. ' +
      'Blibli.com berhak secara sepihak membatalkan pesanan dan/atau menonaktifkan voucher apabila tidak sesuai dengan syarat & ketentuan berlaku dan/atau ditemukan adanya indikasi kecurangan/pelanggaran yang merugikan pihak Blibli.com.',
    term_condition : 'Ekstra diskon 15%, maks. diskon Rp 300.000 berlaku untuk 1000 transaksi pertama (quota diisi secara berkala) khusus kategori  Otomotif, dan Tiket & Voucher (selain voucher belanja fisik) dengan menginput kode voucher "BONUSAN-15" pada saat check out.',
    start_date : '2018-06-26',
    end_date : '2018-06-29',
  },
  {
    name: 'Discount 50% Coffee Bean',
    file: 'http://katalogpromosi.com/wp-content/uploads/2017/09/coffee-bean_mega_26102017.jpg',
    short_description: 'diskon 50%, Maksimum diskon Rp. 300.000',
    description: 'Promo hanya berlaku tanggal 26 - 29 Juni 2018 pukul 00.00-23.59 WIB.' +
      'Harga produk yang tertera pada website BELUM termasuk Ekstra Diskon. ' +
      'Untuk mendapatkan Ekstra Diskon, masukkan kode voucher pada halaman Pengiriman & Pembayaran. ' +
      '1 user ID dapat menggunakan masing-masing kode voucher dengan jumlah maksimum 1x/transaksi. ' +
      '1 user ID hanya dapat melakukan 1x transaksi dengan jumlah maksimum 3 pcs untuk setiap SKU produk. Pembelian yang melebihi ketentuan menggunakan alamat email dan/atau alamat pengiriman yang sama tidak diperbolehkan ' +
      '1 kode voucher hanya dapat digunakan 1x dan berlaku untuk 1 nomor credit card dan atau 1 member yang telah melakukan verifikasi nomor handphone.  ' +
      'Promo Big PayDay tidak dapat digabungkan dengan promo lainnya, termasuk promo pembelian Blibli Gift Card, pembelian Blibli Pulsa, dan penggunaan Coupon & Voucher Blibli.com. ' +
      'Blibli.com berhak secara sepihak membatalkan pesanan dan/atau menonaktifkan voucher apabila tidak sesuai dengan syarat & ketentuan berlaku dan/atau ditemukan adanya indikasi kecurangan/pelanggaran yang merugikan pihak Blibli.com.',
    term_condition : 'Ekstra diskon 15%, maks. diskon Rp 300.000 berlaku untuk 1000 transaksi pertama (quota diisi secara berkala) khusus kategori  Otomotif, dan Tiket & Voucher (selain voucher belanja fisik) dengan menginput kode voucher "BONUSAN-15" pada saat check out.',
    start_date : '2018-06-26',
    end_date : '2018-06-29',
  }
];

export default class VoucherDetail extends Component {

  constructor(props){
    super(props);
    this.state = {data: {name: null, file: null, description:null}, shakeCounter: 0, shakeLoading: false, isResultShake: false};
  }

  componentWillMount() {
    this.setState({data: {name: null, file: null, description:null}, shakeCounter: 0, shakeLoading: false, isResultShake: false});
  }

  componentDidMount() {
    RNShakeEvent.addEventListener('shake', () => {
      this._shake();
    });
  }

  _shake() {
    if (this.state.shakeCounter >= 3) {
      Alert.alert("Super coupon hanya dapat di shake maksimal 3 kali.");
      return true;
    }
    this.setState({
      shakeLoading: true
    });
    setTimeout(() => {
      this.setState({
        shakeLoading: false,
        isResultShake: true
      });
      Vibration.vibrate(300);
      const result = data[Math.round(Math.random() * (data.length - 0) + 0)];
      var index = data.indexOf(5);
      if (index > -1) {
        data.splice(index, Math.round(Math.random() * (data.length - 0) + 0));
      }
      this.setState({
        data: result,
        shakeCounter: (this.state.shakeCounter + 1)
      });
      return true;
    }, 3000);
    return true;
  }

  componentWillUnmount() {
    RNShakeEvent.removeEventListener('shake');
  }

  _voucherDetail(params) {
    Actions.push('voucherDetail', {data:params});
  }

  render() {
    if(this.state.shakeLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    } else {
      return(
        <ScrollView>
          <View style={styles.container}>
            {
              this.state.isResultShake ? 
              <TouchableOpacity onPress={() => this._voucherDetail(this.state.data)}>
                <Card
                  image={{uri: this.state.data.file ? this.state.data.file : '' }}
                  imageStyle={styles.cardImageStyle}>
                  <Text style={styles.cardTitleTextStyle}>
                    {this.state.data.name}
                  </Text>
                  <Text>
                    {this.state.data.short_description}
                  </Text>
                </Card>
              </TouchableOpacity>
              :
              null
            }
            {
              this.state.isResultShake ?
              <Button title="Download" onPress={() => Alert.alert("Anda telah mengambil Super Coupon.")} buttonStyle={{marginTop: 16, backgroundColor: '#2a64c1'}} />
              :
              <Button title="Shake" onPress={() => this._shake()} buttonStyle={{marginTop: 16}} />
            }
            {
              this.state.isResultShake ?
              <Button title="Skip and Shake Again" onPress={() => this._shake()} buttonStyle={{marginTop: 16}} />
              :
              null
            }
            
          </View>
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardImageStyle: {
    height: 180,
  },
  cardTitleTextStyle: {
    marginBottom: 10, 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#111'
  },
});